//change images array and tiles_number
var images = ['1.png','2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png'],
	click1 = '-1',
	found = 0, 
	tiles_number = 16,
	done = true;

// populate main holder with tiles
for (var i = 0; i < tiles_number; i++){
	$('#mainWrapper').append('<div class="tile tile-' + i + ' unflipped"></div>');
}

//shuffle final array
var pair = shuffle(images.concat(images));

$(document).ready(function(){

	$('.tile').click(function(){
		if (done){
			done = false;
			var nr = $(this).attr('class').split(' ')[1].split('-')[1],
				$this = $(this);

			if ($this.hasClass('unflipped')){
				$this.flip({
					direction:'lr',
					color: '#d35400',
					onAnimation: function(){
						$this.addClass('flipped').removeClass('unflipped');
						$this.css({'background-image':'url(images/' + pair[nr] +')'})
					},
					onEnd: function(){
						if (click1 == '-1'){
							done = true;
							click1 = nr;
						}else{
							//pair is good
							if (pair[click1] === pair[nr]){
								done = true;
								found++;
								click1 = '-1';
							//pair is wrong
							}else{
								setTimeout(function() {
								    $this.revertFlip();
								    $('.tile-' + click1).revertFlip();
							    done = true;
								    click1 = '-1';
								},1000);
							}
						}
					}
				});
			}
		}else{
			done = true;
		}

		setTimeout(function() {
			if(found == 8){
				alert('done');
			}
		}, 1000);
	});
});

//shuffle array
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
