function SomeFunction(request, response){
    const dynamicDate = new Date();

    response.json({
        date: dynamicDate.toGMTString()
    });
}

export default SomeFunction;