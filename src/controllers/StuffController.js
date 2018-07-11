/**
 * Created by levy on 2018/7/5.
 */
import { route, GET, POST,before } from 'awilix-koa'

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
        const result = await this.stuffService.add(ctx.params.name, ctx.params.tel, ctx.params.birth);
        ctx.body = {data: result};
    }

    @route("/getStuff")
    @GET()
    async getStuff(ctx, next){
        const result = await this.stuffService.getData(ctx.params.name, ctx.params.tel);
        ctx.body = {data: result};
    }

}