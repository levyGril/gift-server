/**
 * Created by levy on 2018/7/5.
 */
import { route, GET, POST,before } from 'awilix-koa'
import querystring from 'querystring';

@route("/api/stuff")
export default class StuffController{
    constructor({stuffService}){
        this.stuffService = stuffService;
    }

    @route("/create")
    @GET()
    async createTable(ctx, next){
        const result = await this.stuffService.createTable();
        ctx.body = {data: result};
    }

    @route("/add")
    @GET()
    async addOne(ctx, next){

        //从上下文中直接获取
        if(!ctx.querystring){
            ctx.body = {data: "param error"};
            return;
        }
        let ctx_querystring = querystring.parse(ctx.querystring);

        const result = await this.stuffService.add(ctx_querystring.name, ctx_querystring.tel, ctx_querystring.birth, ctx_querystring.giftYear);
        ctx.body = {data: result};
    }



    @route("/updateStuff")
    @GET()
    async update(ctx, next){

        //从上下文中直接获取
        if(!ctx.querystring){
            ctx.body = {data: "param error"};
            return;
        }
        let ctx_querystring = querystring.parse(ctx.querystring);

        const result = await this.stuffService.update(ctx_querystring.id, ctx_querystring.giftTitle, ctx_querystring.giftId);
        ctx.body = {data: result};
    }

    @route("/getStuff")
    @GET()
    async getStuff(ctx, next){
        //从上下文中直接获取
        if(!ctx.querystring){
            ctx.body = {data: "param error"};
            return;
        }
        let ctx_querystring = querystring.parse(ctx.querystring);
        const result = await this.stuffService.getData(ctx_querystring.name, ctx_querystring.tel);
        ctx.body = {data: result};
    }

}