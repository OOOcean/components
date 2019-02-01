<template>
	<div id="whacMole">
		<alert v-if="getNextQuestionFlag" v-model="showExplain" :title="title" :content="msg" :button-text="btnText" @on-hide="closeExplain" name=""></alert>
			<div>
				<!-- <div id="note4">
					目标：<span class="smallNote">{{pointlimit}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前闯关数：<span class="point smallNote">{{point}}</span>
				</div> -->
				<div id="note5">
					<div  v-show="show4==true">
						失败了！
					</div>
					<div  v-show="show5==true" id="note5-success">
						成功了！
					</div>
				</div>
			</div>
			<div class="container">
        <br>
		<span style="font-size:36px; text-shadow:2px 2px 2px #000; color:#00ff00">{{explainTitle}}</span>

        <div class="game-top">
            <p><img src="http://libs.fengchuanba.com/assets/img/explore/whacmole/target.png">  <span id="target" style="font-size:32px; text-shadow:2px 2px 2px #000; color:#ff0000">{{passPoint}}</span> <span style="font-family:黑体; font-size:24px; text-shadow:2px 2px 2px #000; color:#ff0000">分</span></p>
            <p><img src="http://libs.fengchuanba.com/assets/img/explore/whacmole/total.png">  <span id="game-score" style="font-size:32px; text-shadow:2px 2px 2px #000; color:#ff0000">0</span></p>
            <p><img src="http://libs.fengchuanba.com/assets/img/explore/whacmole/time.png">  <span id="game-time" style=" font-size:32px; text-shadow:2px 2px 2px #000; color:#ff0000">{{questionTime}}</span> <span style="font-family:黑体; font-size:32px; text-shadow:2px 2px 2px #000; color:#ff0000">s</span></p>
        </div>
        <div class="game-content">
            <ul>
                <li><div id="d0"></div></li>
                <li><div id="d1"></div></li>
                <li><div id="d2"></div></li>
			</ul>
			<ul>
                <li><div id="d3"></div></li>
                <li><div id="d4"></div></li>
                <li><div id="d5"></div></li>
			</ul>
			<ul>
                <li><div id="d6"></div></li>
                <li><div id="d7"></div></li>
                <li><div id="d8"></div></li>
            </ul>
        </div>
    </div>
		<!-- <div id="cover1" v-show="show1==true">							
		</div> -->
		<div id="cover2" v-show="show2==true">
			<div id="note1">
				<span style="font-size:2rem">游戏规则</span><br><br><br>
				<span id="note2">打到 <img :src="badmouse" style="width:70px; heigth:70px"> 加1分，打到 <img :src="goodmouse" style="width:70px; heigth:70px"> 扣2分</span><br>
				<div id="note3">
					<span v-show="show3==true">你必须要在 {{timelimit}} 秒之内，</span>得到 {{passPoint}} 分，加油！
				</div>
			</div>	
			<button type="button" id="button1"  @click="start">点击开始</button>		
		</div>
	</div>
	
</template>

<style lang="less">
#whacMole{
	height: 100vh;
		background:url("http://libs.fengchuanba.com/assets/img/explore/whacmole/grassbg.jpg");
		
	#button1{
		padding: 0.25rem;
		margin-top:4rem;
		font-size:1.25rem;
	}
	button {
		min-width:10rem;
		margin:0 auto;
		border-radius:5px;
		color:#FFFFFF;
		font-size:0.85rem;
		text-align:center;
		border:1px solid #FFFFFF;
		background-color:rgba(0,0,0,0.3);
	}
	#note1{
		margin-top: 20%;
	}
	#note3{
		margin-top: 1.8rem;
	}
	
	#cover1{
		width: 100%;
		height:100%;
		position:fixed;
		background:rgba(255,255,255,0);
		background-size:cover;
		text-align: center;
		top: 0rem;
	}
	#cover2{
		width: 100%;
		height:100%;
		position:fixed;
		background-color:rgba(0,0,0,0.75);
		background-size:cover;
		text-align: center;
		top: 0rem;
		color:white;
	}
	.game-content li {
		box-shadow: 0 0 50px #706565 inset;
	}
	.game-content li {
		float: left;
		margin:0px auto;
		border-radius: 60%;
		background-color: #000000;
		box-shadow: 0 0 50px #00ff00 outset;
	}
	.game-content div {
		width: 40px;
		height: 70px;
		opacity: 0;
		border-radius: 40%;
		-webkit-border-radius: 40%;
		-moz-border-radius: 40%;
	}


	@media screen and (max-width: 2000px) {
		.container {
			width: 100%;
		}
		.game-content ul {		
			padding-left:0px;/*消除左侧空白部分*/
			margin:0px auto;
			display: table;
			width:275px;
		}
		.game-content li {
			margin-left: 2.5%;
			margin-right: 2.5%;
			margin-bottom: 10px;
			margin-top:17%;
			width: 75px;
			height:45px;
		}
		.game-content div {
			width: 50px;
			height:70px;
		}
	}

	@-webkit-keyframes mouse-move {
		50% {
			margin-top: -27.5px;
			opacity: 1;
		}
		100% {
			margin-top: -12px;
			opacity: 0;
		}
	}
	@keyframes mouse-move {
		50% {
			margin-top: -27.5px;
			opacity: 1;
		}
		100% {
			margin-top: -12px;
			opacity: 0;
		}
	}

	.game-content div.active {
		animation: mouse-move 2s infinite;
			animation-duration: mouse-move 2s infinite;
	}
	@keyframes mouse-move {
		50% {
			margin-top: -30px;
			opacity: 1;
		}
		100% {
			margin-top: -25px;
			opacity: 0;
		}
	}
	.game-content div.active {
		animation-duration: mouse-move 2s infinite;
	}

	.game-content div.bad[clicked="1"]::after {
		content:url("http://libs.fengchuanba.com/assets/img/explore/whacmole/pia.png");
		line-height: 100px;
		font-size: 0px;
		color: #0ad845;
	}
	.game-content div.good[clicked="1"]::after {
		content: "打错啦！-50";
		line-height: 0px;
		font-size: 15px;
		color: #fff000;
	}
	.game-content li:last-child {
		margin-bottom: 30px;
	}


	.game-content div.bad {
		width:100%;
		background-size:100% 100%;
	}


	.game-content div.good {
		width:100%;
		background-size:100% 100%;
	}

	/*九宫格背景的大div*/
	.game-content {
		overflow: auto;
		width: 100%;	
	}
	/*ul的格式，否则有小点*/
	.game-content ul {
		list-style: none;
	}
	/*上部div布局*/
	.container {
		width: 100%;
		height: 300px;
		margin: 0px auto;
		text-align: center;
	}
	.game-top {
		padding-top: 0px;
		width: 100%;
		height: 155px;
	}
	.game-top p {
		margin: 5px;
	}
}	

</style>

<script>
	import cdn from '@/filters/parseFile'
	import * as config from '@/configs'
	import { Alert } from 'vux'	

	export default {	
		data () {		
			return {
				cdn_url:config.cdn_url,
				picArray:[],
				picList:[],
				show1:false,
				show2:true,
				show3:true,
				show4:false,
				show5:false,
				choosePic:[],
				point:0,
				class_a:[false,false,false,false,false,false,false,false,false],
				passPoint:0,
				timelimit:0,
				badmouse:"",
				goodmouse:"",
				explainTitle:"",
				showExplain:false,
				msg:"",
				title:"提示",
				btnText:"确定",
			}
		},
		computed:{
			// totalTime(){
			// 	return this.$store.state.totalTime
			// },
			life(){
				return this.$store.state.life
			},
			exploreDetail(){
				return this.$store.state.exploreDetail
			},
			questionTime(){
				return this.$store.state.questionTime
			},
			secretBox(){
				return this.$store.state.secretBox
			},
			question(){
				return this.$store.state.question
			},
			qConfig(){
				return this.$store.state.qConfig
			},
			getNextQuestionFlag(){
				return this.$store.state.getNextQuestionFlag
			},
		},
		mounted () {
			const detail = JSON.parse(this.question.detail)
			this.passPoint=detail.passPoint;
			this.picList = Array.from(detail.cardList)
			this.timelimit=this.question.timeLimit;
			this.explainTitle = this.qConfig.explainTitle
			if(this.question.timeLimit==0){
				this.show3=false
			}
			if(this.picList[1].length != 0 && this.picList[1] != null){
				this.badmouse = this.cdn_url+this.picList[1];
			}
			else{
				this.badmouse = "http://libs.fengchuanba.com/assets/img/explore/whacmole/badmouse.png";
			}
			if(this.picList[0].length != 0 && this.picList[0] != null){
				this.goodmouse = this.cdn_url+this.picList[0];
			}
			else{
				this.goodmouse = "http://libs.fengchuanba.com/assets/img/explore/whacmole/goodmouse.png";
			}						
			this.$store.dispatch('questionTimeStop')
			this.MouseGame()
		},
		components:{
			Alert
		},
		methods:{
			MouseGame:function(){				
				this.mousesWrap = $('.game-content');//九宫格
				this.mouses = $('.game-content div');//地鼠
				this.gameStart = $('#game-start');//开始按钮
				this.gameScore = $('#game-score');//分数
				this.goodScore = 2;
				this.badScore = 1;
				this.bindEvent();					
			},

			/**
			 * 获取元素
			 * @param  {String} elem 元素的字符串标识
			 * @example
			 * $('div') | $('p.active')
			 * @return {NodeList}      获取的元素集
			 */
			$: function(elem) {
				return document.querySelectorAll(elem);
			},    

			/**
			 * 获取给定范围的随机数
			 * @param  {Number} from 起始
			 * @param  {Number} to   结束
			 * @return {Number}      随机数
			 */
			getRandom: function(from, to) {
				return Math.floor(Math.random() * (to - from + 1)) + from;
			},    

			/**
			 * 设置元素内容
			 * @param  {HTMLElement} elem 要设置的元素
			 * @param  {String} val  设置的内容
			 * @return {String}      设置好的内容|元素本身的内容
			 */
			text: function(elem, val) {
				if (elem.textContent) {
					return val !== undefined ? elem.textContent = val : elem.textContent;
				} else if (elem.innerText) {
					return val !== undefined ? elem.innerText = val : elem.innerText;
				}
			},    

			// 运动操作
			moveUpAndDown: function() {
				var that = this;        
				var elem;
				// 定时器随机定义good|bad老鼠个数，以及需要显示的个数
				that.moveTime = setInterval(function() {  
					for (var i = 0; i < that.mouses.length; ++i) {
						that.mouses[i].setAttribute('clicked', '0');
						that.mouses[i].className = 'bad active';//设置标签的属性————全部为bad
						that.mouses[i].style.display = 'none';
						if(that.picList[1].length != 0 && that.picList[1] != null){
							$("#d"+i).css("background","url("+that.cdn_url+that.picList[1]+")")
							$("#d"+i).css("background-size","100% 100%")
							$("#d"+i).css("width","100%")
						}
						else{
							$("#d"+i).css("background","url(http://libs.fengchuanba.com/assets/img/explore/whacmole/badmouse.png)")
							$("#d"+i).css("background-size","100% 100%")
							$("#d"+i).css("width","100%")
						}							
					}
					// bad 的个数
					var badNum = that.getRandom(0, 4);
					for (var i = 0; i < badNum; i++) {
						var j = that.getRandom(0, 8);
						that.mouses[j].className = 'good active';//设置部分属性为good
						if(that.picList[0].length != 0 && that.picList[0] != null){
							$("#d"+j).css("background","url("+that.cdn_url+that.picList[0]+")")
							$("#d"+j).css("background-size","100% 100%")
							$("#d"+j).css("width","100%")
						}
						else{
							$("#d"+j).css("background","url(http://libs.fengchuanba.com/assets/img/explore/whacmole/goodmouse.png)")
							$("#d"+j).css("background-size","100% 100%")
							$("#d"+j).css("width","100%")
						}
					}            

					// 要显示的个数
					var showNum = that.getRandom(0, 4);
					for (var i = 0; i < showNum; i++) {
						that.mouses[that.getRandom(0, 8)].style.display = 'block';
					}
				}, 2000);//每隔2000毫秒重新刷新一次地鼠
			},    		
			// 打地鼠操作
			bindEvent: function() {
				var that = this;   						
				// 打地鼠操作
				that.mousesWrap[0].addEventListener('click', function(e) {
					e = e || window.event;
					var elem = e.target || e.srcElement;
					// 如果当前项被隐藏则不操作，则点击无限加分
					if (elem.style.display !== 'block' || elem.getAttribute('clicked') === '1') {
						return;
					}
					// 扣分
					if (elem.className.indexOf('good') !== -1) {
						if(that.score-that.goodScore >= 0){	
							that.score -= that.goodScore;
						}
						else{
							that.score = 0;
						}
					}
					// 加分
					else {
						that.score += that.badScore;
					}
					if(that.score == that.passPoint){	
						that.ShowAlert(true)							
						that.$store.dispatch('rightAnswer',that.score)
					}
					elem.setAttribute('clicked', '1');
					that.text(that.gameScore[0], that.score);
				}, false);
			}, 
			closeExplain:function() {			
				this.showExplain=false
				this.$store.dispatch("showNextQuestion")
			},     
			ShowAlert:function(ansCorrect){
				if(this.qConfig.answerExplain
					&&((ansCorrect&&this.secretBox.config.showAnswerExplain&&this.secretBox.config.showAnswerExplain==3)
					||(!ansCorrect&&this.secretBox.config.showAnswerExplain&&this.secretBox.config.showAnswerExplain==1)
					||this.secretBox.config.showAnswerExplain&&this.secretBox.config.showAnswerExplain==2)
					){
						this.$store.commit('set_directNextQuestionFlag',false)
						this.btnText=this.secretBox.config.explainButton||"确定"
						this.msg=this.qConfig.answerExplain
						this.title=this.qConfig.explainTitle||"答案提示"
						this.showExplain=true
				}
				return
			},
			// 开始游戏
			startGame: function() {
				this.score = 0;
				this.text(this.gameScore[0], this.score);        
				this.moveUpAndDown();//显示地鼠
			},
			start:function(){
				if(this.question.timeLimit>0){
					this.$store.dispatch('questionTimeFlow')
				}
				this.show2=false;
				this.startGame();
			},			
		}		
	}
</script>