namespace tbgame{
    export let gameMode:GameMode;
    export enum EntityEvent  {
        PropertySet = "PropertySet",
        PropertyChanged = "PropertyChanged",
        TagAdded = "TagAdded",
        TagRemoved = "TagRemoved",

    };
    /**
     * 标签字典
     */
    interface TagDictionary{
        [index:string]:number;
    }

    /**
     * 属性字典
     */
    interface PropertyDictionary{
        [index:string]:any;
    }

    export interface FunctionMap{
        [index:string]:(...args:any[])=>void;
    }

    interface ChangeInfo{
        causer:Entity;
    }

   

    /**
     * TBGame中游戏对象的定义
     */
    export class Entity extends EventEmitter{
        name:string;
        private tags:TagDictionary;
        protected properties:PropertyDictionary;
        private propertyProcessAfterGet:{[index:string]:Array<(v:number)=>number>};
        private propertyProcessBeforeChange:{[index:string]:Array<(v:number,changeInfo:ChangeInfo)=>number>};
        constructor(){
            super();

            this.tags = {};
            this.properties = {};
            this.propertyProcessAfterGet = {};
            this.propertyProcessBeforeChange = {};
        }

        addPropertyProcessAfterGet(name:string,func:(value:number)=>number){
            let funcs = this.propertyProcessAfterGet[name];
            if(!funcs){
                funcs = [];
                this.propertyProcessAfterGet[name] = funcs;
            }
            funcs.push(func);
        }
        addPropertyProcessBeforeChange(name:string,func:(value:number,causer:Entity)=>number){
            let funcs = this.propertyProcessBeforeChange[name];
            if(!funcs){
                funcs = [];
                this.propertyProcessBeforeChange[name] = funcs;
            }
            funcs.push(func);
        }

        onEventsMap(eventsMap:FunctionMap){
            let handlers:Array<()=>void> = [];
            for(let event in eventsMap){
                handlers.push(this.on(event,eventsMap[event]));
            }
            return function(){
                if(!handlers){
                    log.e("重复取消事件注册");
                    return;
                }
                
                for(let i=0,len=handlers.length;i<len;++i){
                    handlers[i]();
                }

                handlers = null;
            }
        }


        //region 标签
        hasTag(tag:string){
            return this.tags[tag] > 0;
        }

        addTag(tag:string){
            if(this.tags[tag]){
                this.tags[tag]++;
            }
            else{
                this.tags[tag] = 1;
            }

            /**
             * 标签增加事件，要避免循环触发
             */
            this.emit(EntityEvent.TagAdded,tag);
        }

        removeTag(tag:string){
            if(this.tags[tag]){
                this.tags[tag]--;
                if(this.tags[tag]<0){
                    log.e("illegal removeTag",tag);
                }
                /**
                 * 标签减少事件
                 */
                this.emit(EntityEvent.TagRemoved,tag);
            }
        }
        //endregion

        //region 属性
        setProperty(name:string,v:number){
            this.properties[name] = v;
            this.emit(EntityEvent.PropertySet,name,v);
        }

        /**
         * 对属性做加法操作，v可以是负的
         * @param name 属性名
         * @param v 变化量
         * @param causer 造成属性改变的对象
         */
        changeProperty(name:string,v:number,changeInfo:ChangeInfo){
            
            let funcs = this.propertyProcessBeforeChange[name];
            if(funcs){
                let modified = v;
                for(let i=0,len=funcs.length;i<len;++i){
                    modified = funcs[i](modified,changeInfo);
                }
                log.i(this.name+"属性值"+name+"变化"+v+"被修改成变化"+modified);
                v = modified;
            }
            

            
            if(!this.properties[name]){
                this.properties[name] = v;
            }
            else{
                this.properties[name] += v;
            }
            log.i(this.name+"属性值"+name+"变化了"+v+"，从"+(this.properties[name]-v)+"变成"+this.properties[name]);
            this.emit(EntityEvent.PropertyChanged,name,this.properties[name],v,causer);
        }


        getProperty(name:string){
            let v = this.properties[name];
            let funcs = this.propertyProcessAfterGet[name];
            if(funcs){
                let modified = v;
                for(let i=0,len=funcs.length;i<len;++i){
                    modified = funcs[i](modified);
                }
                log.i(this.name+"属性值"+name+"获取结果从"+v+"变化成"+modified);
                v = modified;
            }
            
            return v;
        }

        toStringProperty(){
            let str = "";
            for(let k in this.properties){
                let pro = this.properties[k];
                str += k+":"+pro+" ";
            }
            return str;
        }
        //endregion
    }
    

    
}