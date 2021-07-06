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
    console.log(tableName);
    var table = document.getElementById(tableName);
    var row = table.getElementsByClassName("dataRow");
    console.log(row);
    for (let j = 1; j < row.length; j++) {
        console.log(row[j]);
        row[j].style.backgroundColor = "#d3d3d3";
        j++;
    }
}


function myFunction() {

    var x = document.getElementById("Demo");
    console.log(x);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }

}