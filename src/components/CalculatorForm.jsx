import React from "react"

const PERCENT_ONE = 0.65
const PERCENT_TWO = 0.15

export const CalculatorForm = () => {
    const [numberOfEvents, setNumberOfEvents] = React.useState()
    const [guestCount, setGuestCount] = React.useState()
    const [bevCost, setBevCost] = React.useState(19)

    const beveragePackages = [19, 21, 25, 28]

    const handleNumberOfEventsChange = (event) => {
        setNumberOfEvents(event.target.value);
    }
    
    const handleGuestCountChange = (event) => {
        setGuestCount(event.target.value);
    }

    const handleBevCostChange = (event) => {
        setBevCost(event.target.value);
    }

    const handleSubmit = () => {
        const totalBevRevenue = numberOfEvents * guestCount * bevCost
        const totalCommission = totalBevRevenue * PERCENT_ONE * PERCENT_TWO
        alert(`Your total revenue is $${totalBevRevenue} and your commission is $${totalCommission}`)
    }

    return (
        <form onSubmit={handleSubmit} className="calculator-form">
            <div className="form-item">
                <label id="eventNumber">
                    Events per Year
                    <input
                        type="text"
                        id="eventNumberInput"
                        name="eventNumber"
                        value={numberOfEvents}
                        onChange={handleNumberOfEventsChange}
                    />
                </label>
            </div>
            <div className="form-item">
                <label id="guestCount">
                    Guest Count
                    <input
                        type="text"
                        id="guestCountInput"
                        name="guestCount"
                        value={guestCount}
                        onChange={handleGuestCountChange}
                    />
                </label>
            </div>
            <div className="form-item">
                <label id="bevCost">
                    Beverage Cost per Person
                    <select
                        id="bevCostSelect"
                        name="bevCost"
                        value={bevCost}
                        onChange={handleBevCostChange}
                    >
                        {beveragePackages.map((bp) => <option value={bp}>{bp}</option>)}
                    </select>
                </label>
            </div>
            <button type="submit">Calculate</button>
        </form>
    )
}