
const file = document.getElementById('excelFileUploader');
const jsonTextArea = document.getElementById('jsonTextArea');
const copyJson = document.getElementById('copyJson');
const resetJson = document.getElementById('resetJson');

// read file and extract the data in json formate
const parseExcel = (file, callback) => {
    const reader = new FileReader();

    reader.onload = (e) => {
        const data = e.target.result;

        // XLSX library that will convert data into json formate
        const workbook = XLSX.read(data, {
            type: 'binary'
        });

        workbook.SheetNames.forEach((sheetName) => {
            const XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            const json_object = JSON.stringify(XL_row_object);
            console.log(json_object);
            callback(json_object)
        })
    };

    reader.onerror = function (ex) {
        return ex;
    };

    reader.readAsBinaryString(file);

};


//handle onchage of input type file
file.onchange = (event) => {
    try {
        // call parseexcel and pass file and callback 
        parseExcel(event.target.files[0], setData)
    } catch (error) {
        console.log(error);
    }
}

// set json data in textarea
const setData = (data) => {
    if (data) {
        copyJson.removeAttribute('disabled');
        resetJson.removeAttribute('disabled');
    }
    jsonTextArea.innerHTML = JSON.stringify(JSON.parse(data), null, 4);
}

// handle onclick copy
const copyToClipBoard = () => {
    /* Get the text field */
    const copyText = jsonTextArea;


    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    var toastLiveExample = document.getElementById('copyToast')
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}

const reset = () => {
    const result = confirm('Are you sure to reset?');
    if (result) {
        jsonTextArea.innerHTML = '';
        file.value = '';
        copyJson.setAttribute('disabled', true);
        resetJson.setAttribute('disabled', true);
    }
}

