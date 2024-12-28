export const GetNewName = (name, listNames, limit) => {
    const baseName = name; 
    let newName = baseName; 
    let index = 1; 
    
    while (
        listNames.some((name) => name.toLowerCase() === newName.toLowerCase()) && index <= limit ) {
            newName = `${baseName} ${index}`;
            index++;
        }  
        if (index <= limit) {                  
            return newName
        }else{
            return -1;
        }
}
