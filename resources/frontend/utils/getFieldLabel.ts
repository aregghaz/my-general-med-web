const getFieldLabel = (t:any, label:string, name:string, requiredFields:Array<string>) => {
    
    ////TODO ADD LOGIN TO ADMIN PANEL 
    return label
        ? `${t(`client:${label}`)}${requiredFields.includes(name) ? '*' : ''}`
        : `${t(`client:${name}`)}${requiredFields.includes(name) ? '*' : ''}`;
};

export default getFieldLabel;