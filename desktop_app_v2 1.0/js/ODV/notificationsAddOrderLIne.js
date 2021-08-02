function doNotification(data) {
    Notification.requestPermission().then(function(result) {
        var myNotification = new Notification('Ordine Linea', {
            'title': 'test',
            'icon': '../../assets/images/logo.png',
            'body': 'Prodotto: ' + data.Name + '\nQuantità: ' + data.QtyEntered +
                '\nInserito '

        })
    })
}