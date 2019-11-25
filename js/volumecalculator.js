var volumeCalculator = (function ($) {
    var selectors = {
            document: document,
            form: '.board-engine',
            linkLabel: '.js-link-label',
            submitProgress: '.button--progress',
            recommendedVolume: '.js-recommended-volume',
            loader: '.board-engine__loader',
            advanced: '.board-engine__advanced',
            registerModalContainer: '#register-modal'
        },
        classes = {
        },
        settings = {
            transition: 300,
        },
        nodes = {};

    
    function getLabel(item) {
        if (item.data('labelval')) {
            var option = $('option:selected', item);
            value = (option.data('label') ? option.data('label') : option.text());
        } else {
            value = item.data('label');
        }

        return value;
    }

    function linkLabels() {
        $(selectors.linkLabel).not('.linked').each(function () {
            var item = $(this),
                link = $(item.data('link'));

            item.data('linkelement', link);

            if (item.is('select') || item.children().first().is('select')) {
                link.html(getLabel(item));
            }

            item.addClass('linked').on('change', function () {
                link.html(getLabel(item));
            });
        });
    }

    function updateFormProgress(form) {
        form.find('.button__progress').css('width', getFormProgress(form) + '%');
        form.find('.button--progress').toggleClass('button--progress-complete', getFormProgress(form) == 100);
        // also toggle a class specifically for javascript dependant behaviour, so it's clear.
        form.find('.button--progress').toggleClass('js-button--progress-complete', getFormProgress(form) == 100);
        if (getFormProgress(form) == 100 && form.find('.button__label').text() == "Calculate Volume") {
            form.find('.button--progress').attr('type', 'submit');
        } else {
            form.find('.button--progress').attr('type', 'button');
        }
    }

    function getFormProgress(form) {
        var inputs = form.find('.required-entry'),
            progress = 0,
            step = 100 / inputs.length,
            input,
            type;

        inputs.each(function () {
            input = $(this);
            type = input.attr('type');

            if (!input.hasClass('validation-failed')) {
                if (input.val() !== '') {
                    progress += step;
                }
            }
        });
        return Math.floor(progress);
    }

    function populateOptions() {
        $('.select-slider').each(function () {
            var select = $(this);

            var frequencyLabels = [
                'Please Select',
                'Never',
                'Monthly',
                'Weekly',
                'Daily'
            ];
            
            var fitnessLabels = [
                'Please Select',
                'Could be fitter',
                'Reasonably',
                'Very fit',
            ];

            var levelLabels = [
                'Please Select',
                'Beginner',
                'Competent',
                'Experienced',
                'Advanced',
                'Pro',
            ];
            
            var waveTypeLabels = [
                'Please Select',
                'Fat and slow',
                'Reasonable wave quality',
                'Reef of shallow sand bank',
            ];
            
            var waveSizeLabels = [
                'Please Select',
                '1<small>ft</small> - 3<small>ft</small>',
                '2.5<small>ft</small> - 5<small>ft</small>',
                '4<small>ft</small> - 7<small>ft</small>',
                '6<small>ft</small> - 10<small>ft</small>',
            ];

            switch (select[0].id) {
                case 'options[weight]':
                    for (let i = 40; i <= 110; i++) {
                        select.append('<option value="'+i+'" data-label="'+i+'<small>kg</small> - '+Math.floor(i*2.20462)+'<small>lbs</small>">'+i+'</option>');
                    }
                    break;
                case 'options[height]':
                    for (let i = 100; i <= 220; i++) {
                        var feet = Math.floor(i * 0.0328084);
                        var inches = Math.floor(((i * 0.0328084) - feet) * 12);
                        select.append('<option value="'+i+'" data-label="'+i+'<small>cm</small> - '+feet+'<small>ft</small> '+inches+'<small>in</small>">'+i+'</option>');
                    }
                    break;
                case 'options[age]':
                    for (let i = 10; i <= 65; i++) {
                        select.append('<option value="'+i+'" data-label="'+i+' <small>yrs old</small>">'+i+'</option>');
                    }
                    break;
                case 'options[fitness]':
                    for (let i = 1; i <= 3; i++) {
                        select.append('<option value="'+i+'" data-label="'+fitnessLabels[i]+'">'+fitnessLabels[i]+'</option>');
                    }
                    break;
                case 'options[frequency]':
                    for (let i = 1; i <= 4; i++) {
                        select.append('<option value="'+i+'" data-label="'+frequencyLabels[i]+'">'+frequencyLabels[i]+'</option>');
                    }
                    break;
                case 'options[level]':
                    for (let i = 1; i <= 5; i++) {
                        select.append('<option value="'+i+'" data-label="'+levelLabels[i]+'">'+levelLabels[i]+'</option>');
                    }
                    break;
                case 'options[type]':
                    for (let i = 1; i <= 3; i++) {
                        select.append('<option value="'+i+'" data-label="'+waveTypeLabels[i]+'">'+waveTypeLabels[i]+'</option>');
                    }
                    break;
                case 'options[size]':
                    for (let i = 1; i <= 4; i++) {
                        select.append('<option value="'+i+'" data-label="'+waveSizeLabels[i]+'">'+waveSizeLabels[i]+'</option>');
                    }
                    break;
                case 'options[gender]':
                    select.append('<option value="1" data-label="Male">Male</option>');
                    select.append('<option value="2" data-label="Female">Female</option>');
                    break;
                default:
                    break;
            }
        });
    }

    function volumeCalculatorAjax(event){
        event.preventDefault();
        
        if (nodes.form.find('.js-button--progress-complete')[0]) {

            if (!nodes.loader.is(':visible')){
                nodes.loader.fadeIn(settings.transition);
            }
            
            var submit = $(this),
                form = submit.closest('form'),
                url = 'https://jsindustriesdev-au.cavecart.com/calculatevolume';

            var ajaxData = {};
            form.serializeArray().map(function(x){ajaxData[x.name] = x.value;});

            $.ajax({
                url: url,
                dataType: 'json',
                type: 'post',   
                data: ajaxData
            }).done(function (result) {

                if (result) {

                    form.find('.button__label').text('Recomended Volume: '+result['volume']+'l ('+result['rangeMin']+'l - '+result['rangeMax']+'l)');
                    form.find('.button--progress').attr('type', 'button');

                } else {

                    console.log('minor error');
                }

                // hide loader
                nodes.loader.fadeOut(settings.transition, function () {
                    nodes.loader.removeClass(classes.processingOrder);
                });
            }).error(function (error) {

                // hide loader
                nodes.loader.fadeOut(settings.transition, function () {
                    nodes.loader.removeClass(classes.processingOrder);
                });

                console.log('major error');
            });
        }
    }

    return {
        init: function () {
            nodes = utils.createNodes(selectors);

            // progress submit buttons
            nodes.submitProgress.each(function () {
                var submit = $(this),
                    form = submit.closest('form'),
                    inputs = form.find('.required-entry');

                submit.wrapInner('<span class="button__label"/>').append('<span class="button__progress"/>');

                submit.on('click', function () {
                    setTimeout(function () {
                        updateFormProgress(form);
                    }, 10);
                });

                inputs.on('input change', function () {
                    form.find('.button__label').text('Calculate Volume');
                    updateFormProgress(form);
                });

                setTimeout(function () {
                    updateFormProgress(form);
                }, 10);
            });

            $('label select').on('click', function () {
                $(this).closest('label').click();
            });

            // linked labels
            linkLabels();

            populateOptions();

            // slider controls
            $('.select-slider').each(function () {
                var select = $(this);
                var slider = $('<div class="slider-control"></div>').insertAfter(select);

                slider.slider({
                    min: 1,
                    max: select.find('option').length,
                    range: "min",
                    value: select[0].selectedIndex + 1,
                    slide: function(event, ui) {
                        select[0].selectedIndex = ui.value - 1;
                        select.change();
                    }
                });

                // insert dividing lines
                var dividers = $('<div class="slider-control__dividers"/>');

                // insert lines
                var options = select.find('option').length,
                    lines = options > 10 ? 5 : options;

                for (var i = 1; i < lines; i++) {
                    dividers.append('<span/>');
                }

                slider.append(dividers);
            });

            nodes.form.on('submit', volumeCalculatorAjax);
        }
    };
})(jQuery);

jQuery(function () {
    volumeCalculator.init();
});
