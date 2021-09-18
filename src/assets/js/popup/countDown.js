export var codeCountDown = function(options){
    var dft = {
        count: 60, 
        waitingTxt: '再次发送',
        emitterBtn: null
    };
    var CodeCountDown = function(options){
        var that = this;
        that.curCount = 60;
        that.timer = null; 
        that.run = false;
        that.opts = {};
        for (var i in dft) {
            if (i in options) {
                that.opts[i] = options[i];
            } else {
                that.opts[i] = dft[i];
            }
        }
    };

    CodeCountDown.prototype.init = function() {
        var that = this;
        that.listener();
    };
    /* timer处理函数 */
    CodeCountDown.prototype.start = function() {
        var that = this;
        if (!that.run) {
            that.run = true;
            that.curCount = that.opts.count;
            that.opts.emitterBtn.innerText = that.curCount + 's后' + that.opts.waitingTxt;
            that.opts.emitterBtn.className = "disabled";
            window.clearInterval(that.timer);
            that.timer = window.setInterval(function () {
                that.SetRemainTime(that);
            }, 1000); 
        }
    };
    CodeCountDown.prototype.SetRemainTime = function(context) {
        var that = context || this;
        if (that.curCount === 0) {
            that.clear();
        } else {
            that.curCount--;
            that.opts.emitterBtn.innerText = that.curCount + 's后' + that.opts.waitingTxt;
        }
    };
    CodeCountDown.prototype.clear = function() {
        var that = this;
        that.run = false;
        that.curCount = 60;
        that.opts.emitterBtn.innerText = '重新发送';
        that.opts.emitterBtn.className = "";
        window.clearInterval(that.timer);
    };

    return new CodeCountDown(options);
}
