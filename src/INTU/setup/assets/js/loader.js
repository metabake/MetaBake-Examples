depp.define({
    'scripts': ['#jquery', '/setup/assets/css/spectreBottom.css'],
    'baseVm': ['/setup/models/BaseViewModel.js'],
    'httpRPC': ['#baseVm', '#RPC',
        '/setup/binding.js',
        '/setup/models/SetupViewModel.js',
        '/intuAPI/IntuAPI.js',
    ],
    'setup': [
        '#scripts', '#httpRPC'
    ],

    'fonts': [
        '#rw', '#OpenSans'
    ]
});

depp.require(['fonts']);