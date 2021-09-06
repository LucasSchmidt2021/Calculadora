class CalcControler
{
    constructor()
    {
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

    initButtonsEvents()
    {
        let buttons = document.querySelectorAll(".calculator > button");

        buttons.forEach((button, index)=>{

            button.addEventListener("click", e =>{
                console.log(button);
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