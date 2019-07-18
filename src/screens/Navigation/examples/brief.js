root{
	sideMenu:{
		left:{

		},
		center:{
			//if you want a topbar a stack must be there
			stack:{
				options:{
					topBar: {
						visible:true
					}
				},
				children: [
				{
					component: {
						name: 'auth',
					}
				},
				{

				}]
			},
			bottomTabs:{
				children:[
				{

				}]
			}
		}
		right:{

		}
	}
}