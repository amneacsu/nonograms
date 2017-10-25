var game={
  marktype:1,
  width:16,
  height:16,
  previewZoom:5,

  getCoords:function(pip_object) {
    var index=$(pip_object).index();
    var x=index%game.height;
    var y=Math.floor(index/game.width);
    return {
      x:x,
      y:y
    };
  },

  setPip:function(x,y,t) {
    $('.grid span').eq(y*game.width+x).attr('class','state'+t);
    game.data[x][y]=t;

    if (game.mode=='create') {
      game.recalcColumn(x);
      game.recalcRow(y);
    }

    var pz=game.previewZoom;
    if (t==1) game.ctx.fillStyle='rgb(0,0,0)';
    else game.ctx.fillStyle='rgb(255,255,255)';
    game.ctx.fillRect(x*pz,y*pz,pz,pz);

  },

  chain:function(arr) {
    var out='';
    for (var y=0;y<arr.length;y++) {
      for (var x=0;x<arr[y].length;x++) {
        var v=arr[x][y];
        if (v==2) v=0;
        out+=v;
      }
    }
    return out;
  },

  checkVictory:function() {
    var a=this.chain(this.data);
    var b=this.chain(this.targetData);
    if (a==b) this.gameover();
  },

  gameover:function() {
    game.killEvents();
    alert('Game over');
  },

  recalcRow:function(y) {
    $nav=game.obj.find('.left nav').eq(y);
    var occ=[];
    var cur=0;
    for (var x=0;x<game.width;x++) {
      if (game.data[x][y]==1) cur++;
      if (game.data[x][y]!=1 && cur>0) {
        occ.push(cur);cur=0;
      }
    }
    if (cur>0) occ.push(cur);
    var s=Math.ceil(game.width/2)-occ.length;

    $nav.find('span').html('');
    for (var i=0;i<occ.length;i++) {
      $nav.find('span').eq(s+i).html(occ[i]);
    }
  },

  recalcColumn:function(x) {
    $nav=game.obj.find('.top nav').eq(x);
    var occ=[];
    var cur=0;
    for (var y=0;y<game.height;y++) {
      if (game.data[x][y]==1) cur++;
      if (game.data[x][y]!=1 && cur>0) {
        occ.push(cur);cur=0;
      }
    }
    if (cur>0) occ.push(cur);
    var s=Math.ceil(game.height/2)-occ.length;

    $nav.find('span').html('');
    for (var i=0;i<occ.length;i++) {
      $nav.find('span').eq(s+i).html(occ[i]);
    }
  },

  loadData:function(data) {
    if (data.length==0) return false;

    for (var i=0;i<this.width*this.height;i++) {
      var t=data[i];
      var y=i%game.height;
      var x=Math.floor(i/game.width);
      game.data[x][y]=data[i];
      game.targetData[x][y]=data[i];
    }

    for (var x=0;x<game.width;x++) {
      this.recalcColumn(x);
    }

    for (var y=0;y<game.height;y++) {
      this.recalcRow(y);
    }

    if (this.mode=='play') {
      for (var y=0;y<game.height;y++) {
        for (var x=0;x<game.width;x++) {
          game.data[x][y]=0;
        }
      }
    } else {
      for (var y=0;y<game.height;y++) {
        for (var x=0;x<game.width;x++) {
          this.setPip(x,y,game.data[x][y]);
        }
      }
    }
  },

  init:function(mode,width,height,data) {

    $.extend(this,{
      mode:mode,
      width:width,
      height:height,
      obj:$('#game')
    });

    this.destroy();

    this.data=new Array(this.width);
    this.targetData=new Array(this.width);
    for (var x=0;x<this.width;x++) {
      this.data[x]=new Array(this.height);
      this.targetData[x]=new Array(this.height);
      for (var y=0;y<this.height;y++) {
        this.data[x][y]=0;
        this.targetData[x][y]=0;
      }
    }

    this.spawn(width,height);
    this.loadData(data);
    this.hookEvents();
  },

  destroy:function() {
    this.obj.find('section').empty();
    this.killEvents();
  },

  spawn:function(width,height) {
    var $game=game.obj;

    // make top guide
    var frag=document.createDocumentFragment();
    for (var i=0;i<width;i++) {
      var $column=$('<nav></nav>');
      for (var j=0;j<Math.ceil(height/2);j++) {
        $('<span></span>').appendTo($column);
      }
      frag.appendChild($column[0]);
    }
    $game.find('.top')[0].appendChild(frag);

    // make left guide
    var frag=document.createDocumentFragment();
    for (var j=0;j<height;j++) {
      var $column=$('<nav></nav>');
      for (var i=0;i<Math.ceil(width/2);i++) {
        $('<span></span>').appendTo($column);
      }
      frag.appendChild($column[0]);
    }
    $game.find('.left')[0].appendChild(frag);

    // make grid

    var frag=document.createDocumentFragment();
    for (x=0;x<width;x++) {
      for (var y=0;y<height;y++) {
        frag.appendChild($('<span></span>')[0]);
      }
    }

    $game.find('.grid').css({
      width:width*17,
      height:height*17
    })[0].appendChild(frag);

    // set sizes
    $game.find('#preview').css({
      width:Math.ceil(width/2)*17,
      height:Math.ceil(height/2)*17
    });

    $game.css({
      width:(Math.ceil(width/2)+width)*17+4,
      height:(Math.ceil(height/2)+height)*17+4
    });

    $('<canvas width="'+width*game.previewZoom+'" height="'+height*game.previewZoom+'"></canvas>')
    .appendTo($game.find('#preview'));

    // save data
    $.extend(this,{
      width:width,
      height:height,
      ctx:$game.find('canvas')[0].getContext('2d')
    });

    $game.removeClass('hidden');
  },

  hookEvents:function() {

    game.obj.find('nav span').mousedown(function() {
      $(this).toggleClass('solved');
      return false;
    }).bind('contextmenu',function() {return false;});

    // hook events
    game.obj.find('.grid').bind('mousedown.grid',function(e) {
      game.marktype=e.which==1?1:2;
      if (game.mode=='create') game.marktype=1;
      var coords=game.getCoords(e.target);
      if (game.data[coords.x][coords.y]==game.marktype) {
        game.marktype=0;
      }

      $('.grid').delegate('span','mouseover.grid',function(e) {
        var c=game.getCoords(this);
        game.setPip(c.x,c.y,game.marktype);
      });

      $(e.target).trigger('mouseover.grid');

      $(window).bind('mouseup.grid',function(e) {
        $('.grid').undelegate('span','mouseover.grid');
        $(window).unbind('mouseup.grid');

        if (game.mode=='play') {
          game.checkVictory();
        }

        return false;
      });

      return false;
    }).bind('contextmenu',function() {
      return false;
    });
  },

  killEvents:function() {
    game.obj.find('.grid').unbind('mousedown.grid');
  }

};

$().ready(function() {

});
