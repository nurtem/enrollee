Ext.define('Jc.container.LogoContainer', {
    extend: 'Ext.Container',
    id: 'jc-logo-container',
    text: null,
    //style: 'cursor: pointer; background: #4983DD !important;',
    style: {
        cursor: 'pointer'
    },
    width: window.outerWidth * 0.65,
    height: 76,
    margin: '5 0 5 0',
    html: Ext.String.format(
        '<img class="jc-logo-img" src="{0}" alt=""{1}"/>',
        Jc.url("images/logo3.png"), this.text
    )
});