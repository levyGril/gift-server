/**
 * Created by levy on 2018/7/5.
 */
import { route, GET, POST,before } from 'awilix-koa'
import querystring from 'querystring';

@route("/api/gifts")
export default class GiftController{
    constructor({giftService}){
        this.giftService = giftService;
    }

    // @GET()
    // async getIndex(ctx, next){
    //     ctx.body = await ctx.render(`users/pages/index`, {data: "我是直出的变量"});
    // }

    // @route("/init")
    // @GET()
    // async initGift(ctx, next){
    //     const result = await this.giftService.connect(function () {
    //         if (error) throw error;
    //     });
    //     ctx.body = {data: result};
    // }

    @route("/create")
    @GET()
    async createGiftTable(ctx, next){
        const result = await this.giftService.createTable();
        ctx.body = {data: result};
    }

    @route("/add")
    @GET()
    async addOneGift(ctx, next){
        const result = await this.giftService.addOne(ctx.params.title, ctx.params.notes, ctx.params.count, ctx.params.category);
        ctx.body = {data: result};
    }

    @route("/update")
    @GET()
    async update(ctx, next){
        //从上下文中直接获取
        if(!ctx.querystring){
            ctx.body = {data: "param error"};
            return;
        }
        let ctx_querystring = querystring.parse(ctx.querystring);
        console.log(ctx_querystring);
        const result = await this.giftService.update(Number(ctx_querystring.id));
        ctx.body = {data: result};
    }

    @route("/getAll")
    @GET()
    async getData(ctx, next){
        const result = await this.giftService.getData();
        ctx.body = {data: result};
    }

    @route("/getGiftById")
    @GET()
    async getGiftById(ctx, next){

        //从上下文中直接获取
        if(!ctx.querystring){
            ctx.body = {data: "param error"};
            return;
        }
        let ctx_querystring = querystring.parse(ctx.querystring);
        console.log(Number(ctx_querystring.id));
        const result = await this.giftService.getDataById(Number(ctx_querystring.id));
        ctx.body = {data: result};
    }

    // @route("/:id")
    // @GET()
    // async getUser(ctx, next){
    //     const result = await this.giftServie.getData(ctx.params.id);
    //     ctx.body = {data: result};
    // }

}