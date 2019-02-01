function MouseGame() {
    this.mousesWrap = this.$('.game-content');//九宫格
    this.mouses = this.$('.game-content div');//地鼠
    this.gameStart = this.$('#game-start');//开始按钮
    this.gameTime = this.$('#game-time');//时间
    this.gameScore = this.$('#game-score');//分数
    this.goodScore = 100;
    this.badScore = 50;

    this.bindEvent();
}

MouseGame.prototype = {
    constructor: MouseGame,    

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

        // 定时器随机定义good|bad老鼠个数，以及需要显示的个数
        that.moveTime = setInterval(function() {            

            for (var i = 0; i < that.mouses.length; ++i) {
                that.mouses[i].setAttribute('clicked', '0');
                that.mouses[i].className = 'good active';//设置标签的属性————全部为good
                that.mouses[i].style.display = 'none';
            }            

            // bad 的个数
            var badNum = that.getRandom(0, 4);
            for (var i = 0; i < badNum; i++) {
                that.mouses[that.getRandom(0, 4)].className = 'bad active';//设置部分属性为bad
            }            

            // 要显示的个数
            var showNum = that.getRandom(0, 4);
            for (var i = 0; i < showNum; i++) {
                that.mouses[that.getRandom(0, 4)].style.display = 'block';
            }
        }, 2000);//每隔2000毫秒重新刷新一次地鼠
    },    

    // 打地鼠操作
    bindEvent: function() {
        var that = this;        

        // 监听游戏开始/重新开始
        that.gameStart[0].addEventListener('click', function() {
            that.startGame();
        }, false);        

        // 打地鼠操作
        that.mousesWrap[0].addEventListener('click', function(e) {
            e = e || window.event;
            var elem = e.target || e.srcElement;

            // 如果当前项被隐藏则不操作，则点击无限加分
            if (elem.style.display !== 'block' || elem.getAttribute('clicked') === '1') {
                return;
            }

            // 扣分
            if (elem.className.indexOf('bad') !== -1) {
				if(that.score-that.badScore >= 0){				
					that.score -= that.badScore;
				}
            }

            // 加分
            else {
                that.score += that.goodScore;
            }            

            elem.setAttribute('clicked', '1');
            that.text(that.gameScore[0], that.score);
        }, false);
    },    

    // 倒计时，当前剩余游戏时间
    countDown: function() {
        var that = this;  
        var t = setInterval(function() {
            that.text(that.gameTime[0], --that.totalTime);
            if (that.totalTime === 0) {//如果时间为0，隐藏所有地鼠
                clearInterval(t);
                clearInterval(that.moveTime);                
                for (var i = 0, j = that.mouses.length; i < j; ++i) {
                    that.mouses[i].style.display = 'none';
                }  		
				document.getElementById('game-score').value=(that.score);
                alert('游戏结束，得分为：' + that.score);
            }
        }, 1000);
    },    

    // 开始游戏
    startGame: function() {
		document.getElementById('game-start').value = "重新开始";
        this.score = 0;
        this.totalTime = 60;
        this.text(this.gameTime[0], this.totalTime);
        this.text(this.gameScore[0], this.score);        

        this.countDown();//倒计时
        this.moveUpAndDown();//显示地鼠
    }
};

new MouseGame();