import $ from 'jquery';

export const floatButtonWhenEntering = function(ele) {
  ele.hover(
    function(e) {
      $('.button-bottom').css({
        transform: 'translateY(-15px)',
        transition: 'opacity 0.2s ease-in, transform 0.35s'
      });
    },
    function(e) {
      $('.button-bottom ').css({
        transform: 'translateY(0)',
        transition: 'opacity 0.2s ease-in, transform 0.35s'
      });
    },
    function(e) {}
  );
}

export const highlightImageOnHover = function(ele) {
  $(ele).hover(
    function(e) {
      const others = $(e.target)
        .parent()
        .siblings()
        .children('img')
        .not(e.target);
      $(others).stop();
      $(others).css({ opacity: 0.7, transition: 'ease-in, 1s' });
    },

    function(e) {
      const others = $(e.target)
        .parent()
        .siblings()
        .children('img')
        .not(e.target);
      $(others).stop();
      $(others).css({ opacity: 1, transition: 'ease-in, 1s' });
    }
  );

}


