getData();
async function getData(){
    const response = await fetch('/read');
    const json = await response.json();
    console.log(json);
    showData(json);
}

const btnSave = document.getElementById('btn_save');
btnSave.addEventListener('click', async event => {

    const action = btnSave.textContent;

    const no    = document.getElementById('no').value;
    const name   = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const description   = document.getElementById('description').value;

    let data = {
        no : no,
        name : name,
        category : category,
        description : description,
        action : action
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
    
    getData();

    $('#exampleModal').modal('hide');

    if(action === 'Simpan'){
        $.alert('Data Berhasil ditambah!');
    }else{
        $.alert('Data Berhasil dirubah!');
    }
});

function showData(json){
    let tr = '';
    $('#databody').html('');
    let no;
    for (let i = 0; i < json.length; i++) {
        no = i + 1;
        tr = $('<tr/>');
        tr.append("<td>" + no + "</td>");
        tr.append("<td>" + json[i].no + "</td>");
        tr.append("<td>" + json[i].name + "</td>");
        tr.append("<td>" + json[i].category + "</td>");
        tr.append("<td>" + json[i].description + "</td>");
        tr.append(`
            <td>
                <button type="button" class="badge badge-primary badge-pill btnEdit" data-no="`+ json[i].no +`">
                    Edit
                </button>
                <button type="button" class="badge badge-danger badge-pill btnHapus" data-no="`+ json[i].no +`">
                    Hapus
                </button>
            </td>`
        );
        $('#databody').append(tr);
    }

    //Jquery Selector
    $(function(){
        $('.btnTambahData').on('click', function(){
            document.getElementById('no').readOnly = false;
            document.getElementById('no').value = '';
            document.getElementById('name').value = '';
            document.getElementById('category').value = '';
            document.getElementById('description').value = '';

            $('#exampleModalLabel').html('Tambah Portofolio');
            $('.modal-footer button[id=btn_save]').html('Simpan');
        });

        $('.btnEdit').on('click', async function(){
            let no = $(this).data('no');
            console.log(no);


            const url = `readbyno/${no}`;
            const response = await fetch(url);
            const json = await response.json();
            console.log(json[0].no);

            document.getElementById('no').readOnly = true;
            document.getElementById('no').value = json[0].no;
            document.getElementById('name').value = json[0].name;
            document.getElementById('category').value = json[0].category;
            document.getElementById('description').value = json[0].description;

            $('#exampleModalLabel').html('Ubah Portofolio');
            $('.modal-footer button[id=btn_save]').html('Ubah Data');
            $('#exampleModal').modal('show');
        });

        $('.btnHapus').on('click', async function(){
            let no = $(this).data('no');

            $.confirm({
                title: 'Hapus Portofolio',
                content: 'Apakah Anda Yakin...???',
                buttons: {
                    ya: {
                        text: 'YA',
                        btnClass: 'btn-blue',
                        action: async function(){
                            const url = `hapus/${no}`;
                            const response = await fetch(url);
                            const json = await response.json();
                            $.alert('Data Berhasil dihapus!');
                            getData();
                        }
                    },
                    tidak: function () {
                        
                    }
                }
            });
        });
    })
}