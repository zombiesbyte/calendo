/*Calendo - James Dalgarno - V1.1 - MIT*/
/*https://github.com/zombiesbyte/calendo*/

var Calendo = {

    selectedDateObj1: new Date(),
    selectedDataObj2: new Date(),
    selectedDay1: 0,
    selectedDay2: 0,
    selectedMonth1: 0,
    selectedMonth2: 0,
    selectedYear1: 0,
    selectedYear2: 0,
    previousDay1: 0,
    previousMonth1: 0,
    previousYear1: 0,
    appOptions: {},
    thisDateObj: new Date(),
    thisYear: 0,
    thisMonthInt: 0,
    thisDateInt: 0,
    thisDayInt: "",
    thisMonthStr: "",
    thisDayStr: "",
    totalDaysThisMonth: 0,

    init: function (options) {
        Calendo.appOptions = Calendo.defineOptions(options);
        Calendo.selectedMonth1 = Calendo.selectedDateObj1.getMonth();
        Calendo.selectedMonth2 = Calendo.selectedDateObj1.getMonth();
        Calendo.selectedYear1 = Calendo.selectedDateObj1.getFullYear();
        Calendo.selectedYear2 = Calendo.selectedDateObj1.getFullYear();

        //Calendo Ground Work
        //we wrap our input in the calendoContainer to control events
        $('[data-calendo]').wrap('<div class="calendoContainer"></div>');

        $('[data-calendo]').on('click', function () {
            $(this).attr('autocomplete', 'off');

            if ($('.calendo').length == 0) {
                //we attach our plugin to our ground work
                $inputE = $(this);

                Calendo.setValue($inputE.val());
                $(this).parent().append(Calendo.attach());

                $('.monthSpan').on('click', function () {
                    Calendo.changeView('month');
                });
                $('.yearSpan').on('click', function () {
                    Calendo.changeView('year');
                });

                $('[data-calendo-nav="left"]').on('click', function () {
                    Calendo.previousMonth();
                    Calendo.changeView('day');
                    Calendo.dateClicker($inputE);
                });
                $('[data-calendo-nav="right"]').on('click', function () {
                    Calendo.nextMonth();
                    Calendo.changeView('day');
                    Calendo.dateClicker($inputE);
                });

                Calendo.dateClicker($inputE); //I need to reattach these listeners after changing date each time

                $('[data-calendo-month]').on('click', function () {
                    Calendo.selectedMonth1 = $(this).data('calendo-month');
                    Calendo.changeView('day');
                    Calendo.dateClicker($inputE);
                });
                $('[data-calendo-year]').on('click', function () {
                    Calendo.selectedYear1 = $(this).data('calendo-year');
                    Calendo.changeView('day');
                    Calendo.dateClicker($inputE);
                });

            } else {
                $('.calendo').remove();
                Calendo.reset();
            }
        });

        $('.calendoContainer').on('mouseleave', function () {
            $('.calendo').remove();
            Calendo.reset();
        });
    },
    reset: function () {
        $inputE = null;
        Calendo.selectedDateObj1 = new Date();
        Calendo.selectedDataObj2 = new Date();
        Calendo.selectedDay1 = 0;
        Calendo.selectedDay2 = 0;
        Calendo.selectedMonth1 = 0;
        Calendo.selectedMonth2 = 0;
        Calendo.selectedYear1 = 0;
        Calendo.selectedYear2 = 0;
        Calendo.previousDay1 = 0;
        Calendo.previousMonth1 = 0;
        Calendo.previousYear1 = 0;
        Calendo.thisDateObj = new Date();
        Calendo.thisYear = 0;
        Calendo.thisMonthInt = 0;
        Calendo.thisDateInt = 0;
        Calendo.thisDayInt = "";
        Calendo.thisMonthStr = "";
        Calendo.thisDayStr = "";
        Calendo.totalDaysThisMonth = 0;

        //Calendo.appOptions = Calendo.defineOptions(options);
        Calendo.selectedMonth1 = Calendo.selectedDateObj1.getMonth();
        Calendo.selectedMonth2 = Calendo.selectedDateObj1.getMonth();
        Calendo.selectedYear1 = Calendo.selectedDateObj1.getFullYear();
        Calendo.selectedYear2 = Calendo.selectedDateObj1.getFullYear();
    },
    dateClicker: function (inputElement) {
        $('[data-calendo-select]').on('click', function () {
            if (Calendo.appOptions.selections == 0) {
                Calendo.selectedDay1 = $(this).data('calendo-select');
                $inputE.attr('value', Calendo.getDateFormat(Calendo.selectedDay1, Calendo.selectedMonth1, Calendo.selectedYear1));
            }
            $(this).addClass('selected');
            inputElement.parent().find('.calendo').remove();
        });
    },
    setValue: function (dateValue) {
        var dayIndex = 0;
        var monthIndex = 0;
        var yearIndex = 0;
        var dayVal = 0;
        var monthVal = 0;
        var yearVal = 0;
        if (Calendo.appOptions.value != undefined) {
            dateValue = Calendo.appOptions.value; //override
        }
        if (dateValue != undefined && dateValue != "") {
            if (Calendo.appOptions.selections == 0) {
                if (Calendo.appOptions.dateFormatDay == 2) dayIndex = Calendo.appOptions.dateFormatStr.indexOf('dd');
                else dayIndex = Calendo.appOptions.dateFormatStr.indexOf('d');
                if (Calendo.appOptions.dateFormatMonth == 2) monthIndex = Calendo.appOptions.dateFormatStr.indexOf('mm');
                else monthIndex = Calendo.appOptions.dateFormatStr.indexOf('m');
                if (Calendo.appOptions.dateFormatYear == 4) yearIndex = Calendo.appOptions.dateFormatStr.indexOf('yyyy');
                else yearIndex = Calendo.appOptions.dateFormatStr.indexOf('yy');
                dayVal = dateValue.substring(dayIndex, dayIndex + Calendo.appOptions.dateFormatDay);
                monthVal = dateValue.substring(monthIndex, monthIndex + Calendo.appOptions.dateFormatMonth);
                yearVal = dateValue.substring(yearIndex, yearIndex + Calendo.appOptions.dateFormatYear);
                Calendo.thisDateObj.setFullYear(yearVal, monthVal - 1, dayVal);
                Calendo.selectedDay1 = Calendo.thisDateObj.getDate();
                Calendo.selectedMonth1 = Calendo.thisDateObj.getMonth();
                Calendo.selectedYear1 = Calendo.thisDateObj.getFullYear();
                Calendo.previousDay1 = Calendo.selectedDay1;
                Calendo.previousMonth1 = Calendo.selectedMonth1;
                Calendo.previousYear1 = Calendo.selectedYear1;
            }
        }
    },
    updateValues: function () {
        Calendo.thisDateObj.setFullYear(Calendo.selectedYear1, Calendo.selectedMonth1, Calendo.selectedDay1);
        //Calendo.thisYear = Calendo.thisDateObj.getFullYear();
        Calendo.thisYear = Calendo.selectedYear1
        Calendo.thisMonthInt = Calendo.selectedMonth1; //Calendo.thisDateObj.getMonth();
        Calendo.thisDateInt = Calendo.thisDateObj.getDate();
        Calendo.thisDayInt = Calendo.thisDateObj.getDay();
        Calendo.thisMonthStr = Calendo.intMonthToStrMonth(Calendo.thisMonthInt);
        Calendo.thisDayStr = Calendo.intDayToStrDay(Calendo.thisDayInt, Calendo.appOptions.modifier);
        Calendo.totalDaysThisMonth = Calendo.daysInThisMonth();
        $('span.monthSpan').html(Calendo.thisMonthStr);
        $('span.yearSpan').html(Calendo.thisYear);
    },
    defineOptions: function (options) {
        Calendo.appOptions = {};
        if (options.startWeekOn != undefined) {
            if (options.startWeekOn == 'monday') Calendo.appOptions.modifier = -1;
            else if (options.startWeekOn == 'tuesday') Calendo.appOptions.modifier = 5;
            else if (options.startWeekOn == 'wednesday') Calendo.appOptions.modifier = 4;
            else if (options.startWeekOn == 'thursday') Calendo.appOptions.modifier = 3;
            else if (options.startWeekOn == 'friday') Calendo.appOptions.modifier = 2;
            else if (options.startWeekOn == 'saturday') Calendo.appOptions.modifier = 1;
            else if (options.startWeekOn == 'sunday') Calendo.appOptions.modifier = 0;
            else Calendo.appOptions.modifier = 0;
        } else Calendo.appOptions.modifier = 0;
        if (options.selectionType != undefined) {
            if (options.selectionType == 'single') Calendo.appOptions.selections = 0;
            else if (options.selectionType == 'double') Calendo.appOptions.selections = 1;
        } else Calendo.appOptions.selections = 0;
        if (options.dateFormat == undefined) options.dateFormat = 'dd-mm-yyyy';
        else {
            if (options.dateFormat.search('dd') > -1) {
                Calendo.appOptions.dateFormatDay = 2;
            } else Calendo.appOptions.dateFormatDay = 1;
            if (options.dateFormat.search('mm') > -1) {
                Calendo.appOptions.dateFormatMonth = 2;
            } else Calendo.appOptions.dateFormatMonth = 1;
            if (options.dateFormat.search('yyyy') > -1) {
                Calendo.appOptions.dateFormatYear = 4;
            } else Calendo.appOptions.dateFormatYear = 2;
            Calendo.appOptions.dateFormatStr = options.dateFormat;
        }
        if (options.value != undefined) Calendo.appOptions.value = options.value;
        if (options.yearsPerRow != undefined) Calendo.appOptions.yearsPerRow = options.yearsPerRow;
        else Calendo.appOptions.yearsPerRow = 6;
        if (options.preYearRows != undefined) Calendo.appOptions.preYearRows = options.preYearRows;
        else Calendo.appOptions.preYearRows = 20;
        if (options.postYearRows != undefined) Calendo.appOptions.postYearRows = options.postYearRows;
        else Calendo.appOptions.postYearRows = 20;
        if (options.leftMenuBtnClass != undefined) Calendo.appOptions.leftMenuBtnClass = options.leftMenuBtnClass;
        else Calendo.appOptions.leftMenuBtnClass = 'is-dark';
        if (options.leftMenuBtniClass != undefined) Calendo.appOptions.leftMenuBtniClass = options.leftMenuBtniClass;
        else Calendo.appOptions.leftMenuBtniClass = 'fa fa-chevron-left';
        if (options.rightMenuBtnClass != undefined) Calendo.appOptions.rightMenuBtnClass = options.rightMenuBtnClass;
        else Calendo.appOptions.rightMenuBtnClass = 'is-dark';
        if (options.rightMenuBtniClass != undefined) Calendo.appOptions.rightMenuBtniClass = options.rightMenuBtniClass;
        else Calendo.appOptions.rightMenuBtniClass = 'fa fa-chevron-right';
        return Calendo.appOptions;
    },
    attach: function () {
        Calendo.thisYear = Calendo.thisDateObj.getFullYear();
        Calendo.thisMonthInt = Calendo.thisDateObj.getMonth();
        Calendo.thisDateInt = Calendo.thisDateObj.getDate();
        Calendo.thisDayInt = Calendo.thisDateObj.getDay();
        Calendo.thisMonthStr = Calendo.intMonthToStrMonth(Calendo.thisMonthInt);
        Calendo.thisDayStr = Calendo.intDayToStrDay(Calendo.thisDayInt, Calendo.appOptions.modifier);
        Calendo.totalDaysThisMonth = Calendo.daysInThisMonth();
        $calendo = $('<div>').addClass('calendo');
        $calendoMenu = $('<div>').addClass('columns is-gapless menu-do');
        $calendoMenu.append(Calendo.leftMenu());
        $calendoMenu.append(Calendo.monthYearMenu());
        $calendoMenu.append(Calendo.rightMenu());
        $calendo.append($calendoMenu);
        $calendo.append(Calendo.daysView());
        $calendo.append(Calendo.monthsView());
        $calendo.append(Calendo.yearsView());
        return $calendo;
    },
    leftMenu: function () {
        var calendoLeftMenu = $('<div>').addClass('column has-text-centered leftCalNav');
        calendoLeftMenu.html('<button class="button ' + Calendo.appOptions.leftMenuBtnClass + '" type="button" data-calendo-nav="left"><i class="' + Calendo.appOptions.leftMenuBtniClass + '"></i></button>');
        return calendoLeftMenu;
    },
    monthYearMenu: function () {
        var calendoMonthMenu = $('<div>').addClass('column has-text-centered monthYearCalMenu is-6');
        calendoMonthMenu.html('<p><span class="monthSpan">' + Calendo.thisMonthStr + '</span> <span class="yearSpan">' + Calendo.thisYear + '</span></p>');
        return calendoMonthMenu;
    },
    rightMenu: function () {
        var calendoRightMenu = $('<div>').addClass('column has-text-centered rightCalNav');
        calendoRightMenu.html('<button class="button ' + Calendo.appOptions.rightMenuBtnClass + '" type="button" data-calendo-nav="right"><i class="' + Calendo.appOptions.rightMenuBtniClass + '"></i></button>');
        return calendoRightMenu;
    },
    changeView: function (viewName) {
        if (viewName == 'day') {
            Calendo.updateValues();
            $('.daySelector').html(Calendo.daysView());
            $('.daySelector').show();
            $('.monthSelector').hide();
            $('.yearSelector').hide();
        }
        else if (viewName == 'month') {
            $('.daySelector').hide();
            $('.monthSelector').show();
            $('.yearSelector').hide();
        }
        else if (viewName == 'year') {
            $('.yearSelector').show();
            $('.daySelector').hide();
            $('.monthSelector').hide();
        }
    },
    previousMonth: function () {
        Calendo.selectedMonth1--;
        if (Calendo.selectedMonth1 == -1) {
            Calendo.selectedMonth1 = 11;
            Calendo.selectedYear1--;
        }
    },
    nextMonth: function () {
        Calendo.selectedMonth1++;
        if (Calendo.selectedMonth1 == 12) {
            Calendo.selectedMonth1 = 0;
            Calendo.selectedYear1++;
        }
    },
    daysView: function () {
        $daysView = $('<div>').addClass('columns is-gapless dayLetterRow');
        var daysOfTheWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        if (Calendo.appOptions.modifier != 0) {
            for (var n = Calendo.appOptions.modifier; n < 7; n++) {
                var daysOfTheWeek = Calendo.arrayRotateOne(daysOfTheWeek); //starts on Monday
            }
        }
        var daysOfTheWeekColumns = "";
        for (var n = 0; n < daysOfTheWeek.length; n++) {
            daysOfTheWeekColumns += '<div class="column has-text-centered unit">' + daysOfTheWeek[n] + '</div>';
        };
        $daysView.append(daysOfTheWeekColumns);
        var totalDaysThisMonth = Calendo.daysInThisMonth(Calendo.thisDateObj.getFullYear(), Calendo.thisDateObj.getMonth());
        var monthObj = new Date('01 ' + Calendo.thisMonthStr + ' ' + Calendo.thisYear);
        var monthStartDayInt = monthObj.getDay();
        var todaysDateObj = new Date();
        var todaysDate = todaysDateObj.getDate();
        var todaysMonth = todaysDateObj.getMonth();
        var todaysYear = todaysDateObj.getFullYear();
        var dayNumber = 1;
        var countCols = 0;
        var days = "";

        for (var n = 0; n < 42; n++) {
            if (countCols == 0) {
                days += '<div class="columns is-gapless dateRow">';
            }
            if (dayNumber <= totalDaysThisMonth && n >= monthStartDayInt + Calendo.appOptions.modifier) {

                if (dayNumber == Calendo.selectedDay1 && Calendo.selectedMonth1 == Calendo.previousMonth1 && Calendo.selectedYear1 == Calendo.previousYear1) {
                    days += '<div class="column has-text-centered unit selected" data-calendo-select="' + dayNumber + '">' + dayNumber + '</div>';
                } else if (dayNumber == todaysDate && Calendo.selectedMonth1 == todaysMonth && Calendo.selectedYear1 == todaysYear) {
                    days += '<div class="column has-text-centered unit today" data-calendo-select="' + dayNumber + '">' + dayNumber + '</div>';
                } else {
                    days += '<div class="column has-text-centered unit" data-calendo-select="' + dayNumber + '">' + dayNumber + '</div>';
                }
            } else {
                days += '<div class="column has-text-centered unit disabled">&nbsp;</div>';
            }
            if (n >= monthStartDayInt + Calendo.appOptions.modifier) dayNumber++;
            countCols++;
            if (countCols == 7) {
                days += '</div>';
                countCols = 0;
            }
        };
        $daysView = '<div class="daySelector">' + $daysView.prop('outerHTML') + days + '</div>';
        return $daysView;
    },
    monthsView: function () {
        var todaysDateObj = new Date();
        var todaysDate = todaysDateObj.getDate();
        var todaysMonth = todaysDateObj.getMonth();
        var todaysYear = todaysDateObj.getFullYear();
        var countCols = 0;
        var months = "";
        for (var n = 0; n < 12; n++) {
            if (countCols == 0) {
                months += '<div class="columns is-gapless dateRow">';
            }
            //priority lies the other way in our selected vs today since it makes more sense
            if (n == todaysMonth) {
                months += '<div class="column has-text-centered unit today" data-calendo-month="' + n + '">' + Calendo.intMonthToStrMonth(n).substring(0, 3) + '</div>';
            } else if (n == Calendo.selectedMonth1) {
                months += '<div class="column has-text-centered unit selected" data-calendo-month="' + n + '">' + Calendo.intMonthToStrMonth(n).substring(0, 3) + '</div>';
            } else {
                months += '<div class="column has-text-centered unit" data-calendo-month="' + n + '">' + Calendo.intMonthToStrMonth(n).substring(0, 3) + '</div>';
            }

            countCols++;
            if (countCols == 4) {
                months += '</div>';
                countCols = 0;
            }
        }
        return '<div class="monthSelector">' + months + '</div>';
    },
    yearsView: function () {
        var todaysDateObj = new Date();
        var todaysDate = todaysDateObj.getDate();
        var todaysMonth = todaysDateObj.getMonth();
        var todaysYear = todaysDateObj.getFullYear();
        var countCols = 0;
        var years = "";
        for (var n = todaysYear - (Calendo.appOptions.yearsPerRow * Calendo.appOptions.preYearRows); n < (todaysYear + (Calendo.appOptions.yearsPerRow * Calendo.appOptions.postYearRows)); n++) {
            if (countCols == 0) {
                years += '<div class="columns is-gapless dateRow">';
            }
            if (n == todaysYear) {
                years += '<div class="column has-text-centered unit today" data-calendo-year="' + n + '">' + n + '</div>';
            } else if (n == Calendo.selectedYear1) {
                years += '<div class="column has-text-centered unit selected" data-calendo-year="' + n + '">' + n + '</div>';
            } else {
                years += '<div class="column has-text-centered unit" data-calendo-year="' + n + '">' + n + '</div>';
            }
            countCols++;
            if (countCols == Calendo.appOptions.yearsPerRow) {
                years += '</div>';
                countCols = 0;
            }
        }
        return '<div class="yearSelector">' + years + '</div>';
    },
    intDayToStrDay: function (intDay, modifier) {
        intDay = intDay + modifier;
        var strDay;
        switch (intDay) {
            case 0: strDay = "Sunday"; break;
            case 1: strDay = "Monday"; break;
            case 2: strDay = "Tuesday"; break;
            case 3: strDay = "Wednesday"; break;
            case 4: strDay = "Thursday"; break;
            case 5: strDay = "Friday"; break;
            case 6: strDay = "Saturday";
        }
        return strDay;
    },
    intMonthToStrMonth: function (intMonth) {
        var strMonth;
        switch (intMonth) {
            case 0: strMonth = "January"; break;
            case 1: strMonth = "February"; break;
            case 2: strMonth = "March"; break;
            case 3: strMonth = "April"; break;
            case 4: strMonth = "May"; break;
            case 5: strMonth = "June"; break;
            case 6: strMonth = "July"; break;
            case 7: strMonth = "August"; break;
            case 8: strMonth = "September"; break;
            case 9: strMonth = "October"; break;
            case 10: strMonth = "November"; break;
            case 11: strMonth = "December";
        }
        return strMonth;
    },
    daysInThisMonth: function (getFullYear, getMonth) {
        return new Date(getFullYear, getMonth + 1, 0).getDate();
    },
    arrayRotateOne: function (arr, reverse) {
        if (reverse)
            arr.unshift(arr.pop())
        else
            arr.push(arr.shift())
        return arr
    },
    getDateFormat: function (fDay, fMonth, fYear) {

        fMonth += 1; //grr
        fDay = Calendo.padStart(fDay, Calendo.appOptions.dateFormatDay);
        fMonth = Calendo.padStart(fMonth, Calendo.appOptions.dateFormatMonth);
        if (Calendo.appOptions.dateFormatYear == 2) {
            fYear = fYear.toString().substring(Calendo.appOptions.dateFormatYear);
        }
        var formattedDate = Calendo.appOptions.dateFormatStr;
        if (Calendo.appOptions.dateFormatDay == 1) formattedDate = formattedDate.replace('d', fDay);
        else if (Calendo.appOptions.dateFormatDay == 2) formattedDate = formattedDate.replace('dd', fDay);
        if (Calendo.appOptions.dateFormatMonth == 1) formattedDate = formattedDate.replace('m', fMonth);
        else if (Calendo.appOptions.dateFormatMonth == 2) formattedDate = formattedDate.replace('mm', fMonth);
        if (Calendo.appOptions.dateFormatYear == 2) formattedDate = formattedDate.replace('yy', fYear);
        else if (Calendo.appOptions.dateFormatYear == 4) formattedDate = formattedDate.replace('yyyy', fYear);
        return formattedDate;
    },
    padStart: function (str, strLen) {
        if (strLen == 2) {
            return ('00' + str).slice(-strLen);
        } else return str;
    }
}