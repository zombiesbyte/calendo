# calendo
A lightweight calendar with a "can do" attitude

![example 1](https://github.com/zombiesbyte/calendo/blob/master/docs/image1.jpg)
![example 2](https://github.com/zombiesbyte/calendo/blob/master/docs/image2.jpg)
![example 3](https://github.com/zombiesbyte/calendo/blob/master/docs/image3.jpg)


## Prerequisite
- jQuery (ver 3.3.1 or greater)
- Bulma CSS (although this could easily be swapped out)
- FontAwesome (I use 4 but this can easily be swapped out for 5)
- The CSS file in this project (you can fine tune nearly everything there)

## Bulma
The Bulma CSS framework is light and flexible however if you're using Bootstrap 4 then you should have no problems in replacing `columns` with `row` and `column` with `col` as Bulma transfers well.

## Usage
*html*
Include a `data-calendo="true"` on your input field. The field should really be set to just 'text' for it's `type`, don't forget to include
`autocomplete="off"` as the calendar will fight with previous field input history provided by your browser. 
```
    <head>
        <!--dont forget these -->
        <link rel="stylesheet" href="/css/bulma.min.css">
        <link rel="stylesheet" href="/css/font-awesome.min.css">
        <link rel="stylesheet" href="/css/calendo.css">
    </head>
    <body> 
    
    ...
    
    <input class="input" type="text" placeholder="Select a date" data-calendo="true" name="my_date" value="" autocomplete="off">

    ...

    <!--dont forget these -->
    <script src="/js/jquery-3.3.1.min.js"></script>
    <script src="/js/calendo.js"></script>
```

*javascript*
```
<script>
    $(document).ready(function () {
        Calendo.init({
            startWeekOn: 'monday', //the starting day of the week
            selectionType: 'single', //future feature but this will be for a range selection
            dateFormat: 'dd-mm-yyyy', //format of day, month year (e.g. d-m-yy, mm-d-yyyy, yyyy-mm-dd are all valid)
            //value: '01-01-2000', // force this seleted value (hmm can't think of a reason to set this option really as your input value should be were it's at)
            yearsPerRow: 5, // how many years per row for year menu
            preYearRows: 20, // how many rows from todays date should be shown (previous years)
            postYearRows: 10,// dito (future years)
            leftMenuBtnClass: 'is-dark', //the css class on the left button
            rightMenuBtnClass: 'is-dark', //the css class on the right button
            leftMenuBtniClass: 'fa fa-chevron-left', //the css/icon class for the font-awesome icon (left)
            rightMenuBtniClass: 'fa fa-chevron-right', //the css/icon class for the font-awesome icon (right)
        });
    });
</script>
```

*CSS*
The default behavour is to force-drop the box which extends the page as it is a hard element. If you wish to have a traditional drop-down that floats over the top of existing page elements then you simply need to modify the following two classes in the CSS file and remove the comments
```
.calendoContainer {
    width: auto;
    height: auto;
    /*position: relative;
    z-index: 1000;*/
}
.calendo {
    width: 300px;
    height: auto;
    background-color:hsl(0, 0%, 96%);
    display: block;
    /*position: absolute;*/
}
```

## Releases/updates

### ver 1.1
- fixed multiple intances. Calendo now resets itself properly at each new instance.
- fixed some CSS issues particularly the size of box issue which resulted in loss of focus
- fixed issue with January selection setting the year incorrectly
- fixed issue with EG and FF requiring day (01) to be set on Date object (Chrome didn't mind if this was missing)
- removed dead variables
- Cross browser testing (Chrome, FireFox, Edge) (Safari, Opera, IE untested)
    - Chrome (Win10 64x) ver 73.0.3683.103
    - FireFox (Win10 64x) ver 66.0.3
    - Edge (Win10 64x) ver 44.17763.1.0

### ver 1.0
- initial release



## Disclaimer
This is very much an untested calendar/date picker however in the coming weeks/months I hope to shorten or remove this disclaimer.
- Other versions of jQuery greater than 3.3.1 (untested)
- Browser testing incomplete
    - Safari, Opera and IE untested
    - Chrome, FireFox and Edge only tested on Windows 10 (x64)

