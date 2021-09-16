class CalcControler
{
    constructor()
    {
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#date");
        this._timeEl = document.querySelector("#time");
        this.currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize()
    {
        this.setDisplayDateTime();

        setInterval(() =>{

            this.setDisplayDateTime();
            
        }, 1000);
    }

    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);
        });
    }

    clearAll(){
        this._operation = [];
    }

    clearEntry(){

        this._operation.pop();

    }

    getLastOperation(){
        return this._operation[this._operation.length-1];
        
    }

    setLastOperation(value){
        this._operation[this._operation.length-1] = value;
    }

    isOperator(value){
        
        return (["+", "-", "*", "/"].indexOf(value) > -1);
    }

    pushOperation(value){
        this._operation.push(value);
        if (this._operation.length > 3){
            
            this.calc();
        }
    }

    calc(){

        let last = this._operation.pop();
        
        let result = eval(this._operation.join(""));

        this._operation = [result, last];
        this.setLastNumberToDisplay();

    }

    setLastNumberToDisplay(){
        let lastNumber;

        for (let i = this._operation.length-1; i >= 0; i--) {
            
            if (!this.isOperator(this._operation[i]))
            {
                lastNumber = this._operation[i];
                break;
            }
        }

        this.displayCalc = lastNumber;
    }

    addOperation(value){
        console.log('A', value, isNaN(this.getLastOperation()))
        console.log(this.isOperator(value));

        if(isNaN(this.getLastOperation())){
            //string
            if(this.isOperator(value)){
                //change operation
                this.setLastOperation(value);

            }else if(isNaN(value)) {

                console.log("outra coisa", value);

            } else {
            
                this.pushOperation(value);
                this.setLastNumberToDisplay();

            }
        } else {
                if(this.isOperator(value)){

                    this.pushOperation(value);

                }else{

                    let newValue = this.getLastOperation().toString() + value.toString();
                    this.setLastOperation(parseInt(newValue));
                    this.setLastNumberToDisplay();
                }
        }

        console.log(this._operation);
    }

    setError(){
        // this.displayCalc = "Error !!";
    }


    execButton(value){
        switch(value) {
            case 'c':
                this.clearAll();
                break;
            case '/':
                this.addOperation('/');
            break;
            case '*':
                this.addOperation('*');
            break;
            case '+':
                this.addOperation('+');
            break;
            case '-':
                this.addOperation('-');
            break;
            case '.':
                this.addOperation('.');
            break;
            case '=':
                
            break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;    
            default:
                this.setError();
            break;

        }
    }


    initButtonsEvents()
    {
        let buttons = document.querySelectorAll(".calculator > button");

        buttons.forEach((button, index)=>{

            this.addEventListenerAll(button, "click drag", e =>{
                
                let textButton = e.target.textContent;
                // console.log(e.target.textContent);
                this.execButton(textButton)
            });
        })
    }

    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime()
    {
        return this._timeEl.innerHTML;
    }

    set displayTime(value)
    {
        return this._timeEl.innerHTML = value;
    }

    get displayDate()
    {
        return this._dateEl.innerHTML;
    }

    set displayDate(value)
    {
        return this._dateEl.innerHTML = value;
    }

    get displayCalc()
    {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value)
    {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate()
    {
        return new Date();
    }

    set currentDate(value)
    {
        this._currentDate = value;
    }

}