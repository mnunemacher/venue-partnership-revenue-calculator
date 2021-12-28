import React from "react"

const CATERING_MARGIN = 0.65
const LIQUOR_STORE_MARGIN = 0.15

export const CalculatorForm = () => {
    const [numberOfEvents, setNumberOfEvents] = React.useState()
    const [guestCount, setGuestCount] = React.useState()
    const [bevCost, setBevCost] = React.useState(19)

    const beveragePackages = [19, 21, 25, 28, 30, 35]

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
        const totalCommission = totalBevRevenue * CATERING_MARGIN * LIQUOR_STORE_MARGIN
        alert(`Your total revenue is $${totalBevRevenue} and your commission is $${totalCommission}`)
    }

    return (
        <div className="form-wrapper">
            <div className="form-inner-wrapper">
                <form onSubmit={handleSubmit} className="calculator-form">
                    <div className="field-list clear">
                        <div className="form-item field number required">
                            <label id="eventNumberLabel" className="title" for="eventNumber">
                                {'Events per Year '}
                                <span className="required" aria-hidden="true">*</span>
                            </label>
                            <div class="description">Enter the average number of events hosted per year</div>
                            <input
                                type="text"
                                className="field-element"
                                id="eventNumberInput"
                                name="eventNumber"
                                value={numberOfEvents}
                                onChange={handleNumberOfEventsChange}
                                spellCheck="false"
                                aria-required="true"
                            />
                        </div>
                        <div className="form-item field number required">
                            <label id="guestCountLabel" className="title" for="guestCount">
                                {'Guest Count '}
                                <span className="required" aria-hidden="true">*</span>
                            </label>
                            <div class="description">Enter the average number of guests per single event</div>
                            <input
                                type="text"
                                className="field-element"
                                id="guestCountInput"
                                name="guestCount"
                                value={guestCount}
                                onChange={handleGuestCountChange}
                                spellCheck="false"
                                aria-required="true"
                            />
                        </div>
                        <div className="form-item field select required">
                            <label id="bevCostLabel" className="title" for="bevCost">
                                {'Beverage Cost per Person '}
                                <span className="required" aria-hidden="true">*</span>
                            </label>
                            <div className="description">
                                This is a sample of our 4 hour pricing for our different packages. Try out a few to see
                                your different earnings potentials
                            </div>
                            <select
                                id="bevCostSelect"
                                name="bevCost"
                                value={bevCost}
                                onChange={handleBevCostChange}
                                aria-required="true"
                            >
                                {beveragePackages.map((bp) => <option value={bp}>{bp}</option>)}
                            </select>
                        </div>
                        <div className="form-button-wrapper" data-animation-role="button">
                            <input
                                className="button sqs-system-button sqs-editable-button sqs-button-element--primary"
                                type="submit"
                                value="Calculate"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}