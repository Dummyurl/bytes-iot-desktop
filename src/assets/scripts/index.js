import '../styles/index.scss';

import './masonry';
import './charts';
import './popover';
import './scrollbar';
import './search';
import './sidebar';
import './skycons';
import './vectorMaps';
import './chat';
import './datatable';
import './datepicker';
import './email';
import './fullcalendar';
import './googleMaps';
import './utils';



$('.dropdown-menu a').click(function(){
    $('#selected').text($(this).text());
    var x = $('#selected').text();
    console.log("selected: ", x);
});
  