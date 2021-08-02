(function($) {



    // Menu.
    var $menu = $('#menu'),
        $menu_openers = $menu.children('ul').find('.opener');

    // Openers.
    $menu_openers.each(function() {

        var $this = $(this);

        $this.on('click', function(event) {

            // Prevent default.
            event.preventDefault();

            // Toggle.
            $menu_openers.not($this).removeClass('active');
            $this.toggleClass('active');


        });

    });

})(jQuery);


function backgroundRowTable(tableName) {
    var table = document.getElementById(tableName);
    var row = table.getElementsByClassName("dataRow");
    for (let j = 1; j < row.length; j++) {
        row[j].style.backgroundColor = "#d3d3d3";
        j++;
    }
}