/**
 * Created by levy on 2018/5/27.
 */
import { route, GET, POST, before } from 'awilix-koa';
import { createBundleRenderer } from 'vue-server-renderer'
const fs = require('fs') ;
const path = require('path') ;
const LRU = require('lru-cache');
// webapp中的router
@route('/')
@route('/index')
export default class IndexController {
    constructor({ indexService }) {
        this.indexService = indexService
    }

    @GET()
    async getIndex(ctx,next) {
        const rootPath = path.join(__dirname, '..');
        const clientManifest = require('../assets/vue-ssr-client-manifest.json');
        const serverBundle = require('../assets/vue-ssr-server-bundle.json');
        const template = fs.readFileSync(rootPath+'/assets/index.html','utf-8');

        // const $= cheerio.load(template);
        // $.title(this.metaDics[ctx.url].title);

        const context = {
            url:ctx.url
        };

        function createRenderer(serverBundle,template,clientManifest){
            return createBundleRenderer(serverBundle,{
                cache: LRU({
                    max: 10000
                }),
                runInNewContext: false,
                template,
                clientManifest
            })
        }
        // 预备环境
        const ssrrender = createRenderer(serverBundle, template,clientManifest);

        //server-entry路由+数据 可渲染的数据流
        function createSSRStreamPromise() {
            return new Promise((resolve, reject)=>{
                if(!ssrrender){
                    return ctx.body = 'waiting for compilation.. refresh in a moment'
                }
                const ssrStream = ssrrender.renderToStream(context);
                ctx.status = 200;
                ctx.type = 'html';
                ssrStream.on("error", err=>{reject(err)}).pipe(ctx.res);
            })
        }
        await createSSRStreamPromise(context);
    }
}