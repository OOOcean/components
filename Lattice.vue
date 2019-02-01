<template>
	<div id="container">
		<alert v-model="showMsg" title="提示" :content="msg" button-text="确定" @on-hide="showMsg=false"></alert>
		<alert title="提示" text="确定" :show.sync="showMsg">{{msg}}</alert>
		<ul id="oUl" v-if="isReady">
			<li><div class="li-out"><div class="li-in" v-if="lattice[0].image"><img :src="lattice[0].image"/></div><div v-else class="div-in"><div class="mid">{{lattice[0].name}}</div></div><div class="mask"></div></div></li>
			<li><div class="li-out"><div class="li-in" v-if="lattice[1].image"><img :src="lattice[1].image"/></div><div v-else class="div-in"><div class="mid">{{lattice[1].name}}</div></div><div class="mask"></div></div></li>
			<li><div class="li-out"><div class="li-in" v-if="lattice[2].image"><img :src="lattice[2].image"/></div><div v-else class="div-in"><div class="mid">{{lattice[2].name}}</div></div><div class="mask"></div></div></li>
			<li><div class="li-out"><div class="li-in" v-if="lattice[3].image"><img :src="lattice[3].image"/></div><div v-else class="div-in"><div class="mid">{{lattice[3].name}}</div></div><div class="mask"></div></div></li>
			<a @click="selected"><img src="http://libs.fengchuanba.com/assets/img/explore/lattice_start.png" style="position: relative;top:5px;width:80px;vertical-align:middle;text-align:center;border-radius: 5px;box-shadow: 3px 3px 3px rgb(105, 105, 105);"></a>
			<li><div class="li-out"><div class="li-in" v-if="lattice[4].image"><img :src="lattice[4].image"/></div><div v-else class="div-in"><div class="mid">{{lattice[4].name}}</div></div><div class="mask"></div></div></li>
			<li><div class="li-out"><div class="li-in" v-if="lattice[5].image"><img :src="lattice[5].image"/></div><div v-else class="div-in"><div class="mid">{{lattice[5].name}}</div></div><div class="mask"></div></div></li>
			<li><div class="li-out"><div class="li-in" v-if="lattice[6].image"><img :src="lattice[6].image"/></div><div v-else class="div-in"><div class="mid">{{lattice[6].name}}</div></div><div class="mask"></div></div></li>
			<li><div class="li-out"><div class="li-in" v-if="lattice[7].image"><img :src="lattice[7].image"/></div><div v-else class="div-in"><div class="mid">{{lattice[7].name}}</div></div><div class="mask"></div></div></li>
		</ul>
	</div>
</template>

<style lang="less">
	    *{
            margin: 0;
            padding: 0;
        }
        #container {
            width: 290px;
            height: 290px;
			margin: 0 auto;
			background-image: url("http://libs.fengchuanba.com/assets/img/explore/lattice_bg.png");
			background-repeat: no-repeat;
			background-size: 100% 100%;
			-moz-border-radius: 1em;
			-webkit-border-radius: 1em;
			border-radius: 1em;

			height:aoto!important;
			min-height:150px;
			max-height: 290px;
        }
        
        #oUl {
            width: 254px;
            height: 254px;
			list-style: none;
			position: relative;
			margin:auto;
			top:18px;
			max-height: 252px;
        }
        #oUl li,
        #oUl a {
            width: 84px;
            height: 84px;
            float: left;
			text-align: center;
			vertical-align:middle;
			position: relative;
			-moz-border-radius: 10px;
			-webkit-border-radius: 10px;
			border-radius: 10px;
		}
		.li-out{
			width: 82px;
			height: 82px;
		}
        .li-in{
			display: block;
			height:100%;
			background-color: rgba(255, 255, 255, 0.95);
			-moz-border-radius: 10px;
			-webkit-border-radius: 10px;
			border-radius: 10px;
			box-shadow: 3px 3px 3px rgb(105, 105, 105);

			img{
				-moz-border-radius: 10px;
				-webkit-border-radius: 10px;
				border-radius: 10px;
				width: 100%;
				height: 100%;
			}
		}
		.div-in{
			display: block;
			height:100%;
			background-color: rgba(255, 255, 255, 0.95);
			-moz-border-radius: 10px;
			-webkit-border-radius: 10px;
			border-radius: 10px;
			box-shadow: 3px 3px 3px rgb(105, 105, 105);
			text-align: center;

			.mid{
				position: relative;
				top:30px;
				vertical-align:middle;
				text-align: center;

			}
        }
        #oUl li .mask{
            width: 100%;
            height: 100%;
            position: absolute;
            background: url(http://libs.fengchuanba.com/assets/img/explore/lattice_mask.png) no-repeat;
            background-size: 100% 100%;
            display: none;
        }
        #oUl a:hover {
            cursor: pointer;
            color: orange;
            font-size: 18px;
		}
		
        #oUl .active .mask{
            display: block;
		}		
		#oUl .active1 .mask{
            display: none;
        }
</style>

<script>
	import {Alert} from 'vux'
	import * as config from '@/configs'

	export default {
		props: {
			prizes:{
				type:Array,
				default:function() {
					return []
				}
			},
			secretBox:{
				type:Object,
				default:{}
			},
			exploreId:{
				type:Number
			},
			registerInfo:{
				type:Object,
				default:{}
			}
		},
		components:{
			Alert
		},
		data () {
			return {
				kicked:[false,false,false],
				showMsg:false,
				msg:'',
				getPrize:false,
				isLottery:false,

				cdn_url:config.cdn_url,
                container:"",
                li:"",
                aa:"",
                page:"",
                timer:null,
                bReady:false,
                order:[0,1,2,4,7,6,5,3],
				num:0,
				i:0,
				t:60,
				img:"",
				rNum:0,
				prize:"",
				lattice:[],
				isReady:false,
			}
		},
		computed:{
			successData(){
				return this.$store.state.successData
			},
			followUserArea(){
				return this.$store.state.followUserArea
			},
			followMatch(){
				return this.$store.state.followMatch
			},
			playChance(){
				return this.$store.state.playChance
			},
			shareCount(){
				return this.$store.state.shareCount
			},
        },
        mounted() {
			this.lattice = new Array()
			for(var i=0;i<8;i++){
				this.lattice[i] = new Object()
				this.lattice[i].image='http://libs.fengchuanba.com/assets/img/explore/xxcy.png';
				this.lattice[i].name = '谢谢参与';
			}

			if(this.prizes.length == 1){
				for(var i = 0;i < 8;i++){
					if(i==1 || i==3 || i==4 || i==6){
						this.lattice[i].image = (this.prizes[0].image ? this.cdn_url + this.prizes[0].image : null)
						this.lattice[i].name = this.prizes[0].name
					}
				}
			}
			else if(this.prizes.length == 2){
				for(var i = 0;i < 8;i++){
					if(i==2 || i==5 || i==7){
						this.lattice[i].image = (this.prizes[1].image ? this.cdn_url + this.prizes[1].image : null)
						this.lattice[i].name = this.prizes[1].name
					}else if(i==0){
						this.lattice[i].image = (this.prizes[0].image ? this.cdn_url + this.prizes[0].image : null)
						this.lattice[i].name = this.prizes[0].name
					}
				}
			}
			else if(this.prizes.length == 3){
				for(var i = 0;i < 8;i++){
					if(i==3){
						this.lattice[i].image = (this.prizes[0].image ? this.cdn_url + this.prizes[0].image : null)
						this.lattice[i].name = this.prizes[0].name
					}
					else if(i == 2 || i == 7){
						this.lattice[i].image = (this.prizes[1].image ? this.cdn_url + this.prizes[1].image : null)
						this.lattice[i].name = this.prizes[1].name
					}
					else if(i==5 || i == 0){
						this.lattice[i].image = (this.prizes[2].image ? this.cdn_url + this.prizes[2].image : null)
						this.lattice[i].name = this.prizes[2].name
					}
				}
			}
			else if(this.prizes.length == 4){	
				this.lattice[3].image = (this.prizes[0].image ? this.cdn_url + this.prizes[0].image : null)	
				this.lattice[4].image = (this.prizes[1].image ? this.cdn_url + this.prizes[1].image : null)
				this.prizes[2].image ? (this.lattice[2].image = this.cdn_url + this.prizes[2].image,
										this.lattice[5].image = this.cdn_url + this.prizes[2].image)
									 : (this.lattice[2].image = null,this.lattice[5].image = null)
				this.prizes[3].image ? (this.lattice[0].image = this.cdn_url + this.prizes[3].image,
										this.lattice[7].image = this.cdn_url + this.prizes[3].image)
									 : (this.lattice[0].image = null,this.lattice[7].image = null)
				this.lattice[3].name = this.prizes[0].name
				this.lattice[4].name = this.prizes[1].name
				this.lattice[2].name = this.prizes[2].name
				this.lattice[5].name = this.prizes[2].name
				this.lattice[0].name = this.prizes[3].name	
				this.lattice[7].name = this.prizes[3].name					 
			}
			else if(this.prizes.length == 5){
				this.lattice[3].image = (this.prizes[0].image ? this.cdn_url + this.prizes[0].image : null)
				this.lattice[4].image = (this.prizes[1].image ? this.cdn_url + this.prizes[1].image : null)
				this.lattice[2].image = (this.prizes[2].image ? this.cdn_url + this.prizes[2].image : null)
				this.lattice[5].image = (this.prizes[3].image ? this.cdn_url + this.prizes[3].image : null)
				this.prizes[4].image ? (this.lattice[0].image = this.cdn_url + this.prizes[4].image,
										this.lattice[7].image = this.cdn_url + this.prizes[4].image)
									 : (this.lattice[0].image = null,this.lattice[7].image = null)
				
				this.lattice[3].name = this.prizes[0].name
				this.lattice[4].name = this.prizes[1].name
				this.lattice[2].name = this.prizes[2].name
				this.lattice[5].name = this.prizes[3].name
				this.lattice[0].name = this.prizes[4].name	
				this.lattice[7].name = this.prizes[4].name	 
			}
			else if(this.prizes.length == 6){
				//将prizes中图片链接依次取出，存放到九宫格中对应奖品等级的格子中，若无图片链接，则保存null
				this.lattice[3].image = (this.prizes[0].image ? this.cdn_url + this.prizes[0].image : null)	
				this.lattice[4].image = (this.prizes[1].image ? this.cdn_url + this.prizes[1].image : null)
				this.lattice[5].image = (this.prizes[2].image ? this.cdn_url + this.prizes[2].image : null)
				this.lattice[2].image = (this.prizes[3].image ? this.cdn_url + this.prizes[3].image : null)
				this.lattice[7].image = (this.prizes[4].image ? this.cdn_url + this.prizes[4].image : null)
				this.lattice[0].image = (this.prizes[5].image ? this.cdn_url + this.prizes[5].image : null)
				//将奖品名称保存到lattice数组中去
				this.lattice[3].name = this.prizes[0].name
				this.lattice[4].name = this.prizes[1].name
				this.lattice[5].name = this.prizes[2].name
				this.lattice[2].name = this.prizes[3].name
				this.lattice[7].name = this.prizes[4].name	
				this.lattice[0].name = this.prizes[5].name	 
			}
			this.isReady = true;
        },
		methods:{
			start:function(){				
				this.container = document.getElementById('container')
				this.li = document.getElementsByTagName('li')
				this.aa = document.getElementsByTagName('a')[0]
				this.page = document.getElementById('page')
                this.timer = setTimeout(this.setFreq(), this.t);
			},
			setFreq:function(){
				var round = 10;
				this.rNum = round*8;
				for(var j = 0; j < this.li.length; j++) {
					this.li[j].className = '';
				}
				var ord = this.order[this.i%this.li.length];
				this.li[ord].className = "active";//显示抽奖框框
				this.i++;
				if(this.i < this.rNum){
					this.timer = setTimeout(this.setFreq, this.t);
				}else if(this.i >= this.rNum-8 && this.i< this.rNum + this.num){
					this.t+=(this.i-this.rNum+8)*5;
					this.timer = setTimeout(this.setFreq, this.t);
				}
				if( this.i >= this.rNum+this.num){
					this.latticee()
					let _this = this
					setTimeout(function(){
						_this.$emit('lottery',_this.prize)
						_this.li[ord].className = "active1";//产生奖品后隐藏框框

					},1000);
					var timer2 = null;
					timer2 = setTimeout(function(){
						clearTimeout(timer2);
					},1000);
					this.bReady = false;
					clearTimeout(this.timer);
				}
			},
            selected(){		
				if (this.secretBox.checkPointCount==0 && this.playChance == 0) {
					if (this.secretBox.shareChance) {
						if (!this.shareCount) {
							let shareMsg = "很抱歉，您的抽奖机会已经用完了,分享朋友圈可多 " + this.secretBox.shareChance + " 次抽奖机会！"
							this.$store.commit("set_shareModal",{
								content:shareMsg,
								showShare:true			
							})
							return
						} 
					}

					//如果没有分享多机会，或者机会已经用完了
					this.msg = '很抱歉，您的抽奖机会已经用完了!'
					if(this.secretBox.config.dayCycle&&this.secretBox.config.dayCycle==1){
						this.msg = '很抱歉，您今天抽奖机会已经用完了!'
					}
					this.showMsg = true
					return
				}		
				if (this.kicked.indexOf(true) >= 0 && this.secretBox.checkPointCount>0) {
					this.msg = '您已经抽过了哟！'
					this.showMsg = true
					return	
				}
				if(this.secretBox.checkPointCount==0){
					this.$store.commit('set_playChance',this.playChance-1)
				}
				
				this.i = 0;
				this.t = 60;
                if(this.bReady) return false;
				this.bReady = true;
				let score = 0
				if(this.successData && this.successData.score!=null){
					score= this.successData.score
				}
				$.post('/service/explore2/lottery', {
					secretBoxCode:this.secretBox.code,
					userId:localStorage.sbox_userid || 0,
					phone:(this.registerInfo && this.registerInfo.phone)?this.registerInfo.phone:"",
					fua:this.followUserArea,
					lm:this.followMatch,
					exploreId:this.exploreId,
					score:score
				},(data, textStatus, xhr) => {
					var n
					if(this.prizes.length == 1){//奖品等级
						if(data.win == "0"){
							n = [1,3,5,7]//出现位置
						}
						else{
							n = [2,4,6,8]
						}
					}
					else if(this.prizes.length == 2){
						if(data.win == "0"){
							n = [2,4,6,8]
						}
						else{
							if(data.prize.sequence == 1){
								n = [1]
							}
							else{
								n = [3,5,7]
							}
						}
					}
					else if(this.prizes.length == 3){
						if(data.win == "0"){
							n = [2,4,6]
						}
						else{
							if(data.prize.sequence == 1){
								n = [8]
							}
							else if(data.prize.sequence == 2){
								n = [3,5]
							}
							else{
								n = [1,7]
							}
						}
					}
					else if(this.prizes.length == 4){
						if(data.win == "0"){
							n = [2,6]
						}
						else{
							if(data.prize.sequence == 1){
								n = [8]
							}
							else if(data.prize.sequence == 2){
								n = [4]
							}
							else if(data.prize.sequence == 3){
								n = [3,7]
							}
							else{
								n = [1,5]
							}
						}
					}
					else if(this.prizes.length == 5){
						if(data.win == "0"){
							n = [2,6]
						}
						else{
							if(data.prize.sequence == 1){
								n = [8]
							}
							else if(data.prize.sequence == 2){
								n = [4]
							}
							else if(data.prize.sequence == 3){
								n = [3]
							}
							else if(data.prize.sequence == 4){
								n = [7]
							}
							else {
								n = [1,5]
							}
						}
					}
					else if(this.prizes.length == 6){
						if(data.win == "0"){
							n = [2,6]
						}
						else{
							if(data.prize.sequence == 1){
								n = [8]
							}
							else if(data.prize.sequence == 2){
								n = [4]
							}
							else if(data.prize.sequence == 3){
								n = [7]
							}
							else if(data.prize.sequence == 4){
								n = [3]
							}
							else if(data.prize.sequence == 5){
								n = [5]
							}
							else {
								n = [1]
							}
						}
					}
					this.num = n[Math.floor(Math.random()*n.length)]
					this.prize = data.prize
					this.start()
				});

            },
            random:function(n, m) {
				return parseInt((m - n) * Math.random() + n);
			},
			latticee (_i) {
				this.kicked.splice(_i,1,true)		
	
			}
		}
	}
</script>