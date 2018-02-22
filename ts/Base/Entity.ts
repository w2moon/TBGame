namespace tbgame{
    const EntityEvent = {
        PropertySet:"PropertySet",
        PropertyChanged:"PropertyChanged",
        TagAdded:"TagAdded",
        TagRemoved:"TagRemoved",

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

    /**
     * TBGame中游戏对象的定义
     */
    export class Entity extends EventEmitter{
        name:string;
        private tags:TagDictionary;
        protected properties:PropertyDictionary;
        constructor(){
            super();

            this.tags = {};
            this.properties = {};
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
        setProperty(name:string,v:any){
            this.properties[name] = v;
            this.emit(EntityEvent.PropertySet,name,v);
        }

        /**
         * 对属性做加法操作，v可以是负的
         * @param name 属性名
         * @param v 变化量
         */
        changeProperty(name:string,v:number){
            if(!this.properties[name]){
                this.properties[name] = v;
            }
            else{
                this.properties[name] += v;
            }
            this.emit(EntityEvent.PropertyChanged,name,this.properties[name],v);
        }


        getProperty(name:string){
            return this.properties[name];
        }
        //endregion
    }
    

    
}