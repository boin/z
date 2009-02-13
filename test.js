function getData(group){
	switch(group){
		case 1:
			return {
				id:'1',
				action:'#1',
				UserName:'boinjj',
				Password:'passwd',
				Sex:'male',
				Photo:'badnumber',
				Fav:'3',
				Good:['2','4'],
				Message:'BoinJJ Rocks!'
			}
		case 2:
			return {
				id:'2',
				action:'#2',
				UserName:'zlabs',
				Password:'wordpass',
				Sex:'female',
				Photo:'numberbad',
				Fav:['1','2'],
				Good:'4',
				Message:'Zlabs Rocks!'
			}
		;
	}
}

$.debugMode = $.browser.mozilla;