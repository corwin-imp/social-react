'use strict';
export default class Device {
	name: string;
	_power: boolean;
	_choose: any;
	_list: any;

	constructor(name:string) {
		this.name = name;
		this._power = true;
		this._choose = 0;
		this._list = [];
	}
	
	choose(choose: any){

		if(choose ===undefined){
			return this._choose;
		}else{	
			if(!this._power){throw new Error("powerError");}
			if(this._list.indexOf(choose) != -1){
				this._choose = choose;
			}else{
				throw new Error("not in list");
			} 
		}
	}
	get list() {
		if(!this._power){throw new Error("powerError");}
		return this._list;
	}
	set list(list: any){				//
		if(!this._power){throw new Error("powerError");}
		if(Array.isArray(list)){ 
			this._list = list;
		}else{
			throw new Error("list must be array");
		}
	}
	set power(power: boolean) {
		if(typeof power =="boolean"){
			this._power = power;
		}
	}
	get power() {
		return this._power;
	}
	/* toString() {
		if(!this._power){throw new Error("powerError");}
		let strList = this._list.join(',');
		return    ` /текущий выбор: ${this._choose}  /cписок: (${strList})`;
	} */
}
