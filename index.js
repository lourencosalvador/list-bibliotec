export async function getDataUsers(){
    await new Promise(resolve => setTimeout(resolve, 1000))

    return [
        {id: 1, name: "Lorrys Code", status: true},
        {id: 1, name: "Maria Dande", status: false},
        {id: 1, name: "Pedro Lopo", status: true}
    ]
}



console.log(getDataUsers.name)