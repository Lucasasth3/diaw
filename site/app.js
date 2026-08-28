fetch('/produtos')
    .then (res => res.json)
    .then (data => {
        data.array.forEach(element => {
            document.body.innerHTML(`<p> ${element.create.body} </p>`)
        });
    })
        