/// <reference path="Entity.ts" />
namespace TBGame{

    export enum ControllerType{
        /**
         * 人类
         */
        Human,
        /**
         * 电脑
         */
        Computer,
    };
    /**
     * 角色定义
     */
    export class Player extends Entity{
        controllerType:ControllerType;
        constructor(){
            super();
        }
    }
}