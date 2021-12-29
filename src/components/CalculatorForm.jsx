import _ from 'lodash'
import React from 'react'
import { CalculatorTotals } from './CalculatorTotals'
import { Error } from './Error'

const CATERING_MARGIN = 0.65
const LIQUOR_STORE_MARGIN = 0.15

const BEVERAGE_PACKAGES = [19, 21, 25, 28, 30, 35]

const errorReducer = (state, action) => {
    switch (action.type) {
        case 'eventNumber':
            return { ...state, eventNumber: action.payload }
        case 'guestCount':
            return { ...state, guestCount: action.payload }
        case 'bevCost':
            return { ...state, bevCost: action.payload }
        case 'formError':
            return { ...state, formError: action.payload }
        default:
            return state
    }
}

export const CalculatorForm = () => {
    const [eventNumber, setEventNumber] = React.useState('')
    const [guestCount, setGuestCount] = React.useState('')
    const [bevCost, setBevCost] = React.useState(19)
    // Totals state
    const [totalBarRevenue, setTotalBarRevenue] = React.useState(0)
    const [totalCommission, setTotalCommission] = React.useState(0)
    const [hasTotals, setHasTotals] = React.useState(false)
    // Error state
    const [errorState, dispatch] = React.useReducer(errorReducer, {
        eventNumber: { hasError: false, errorMessage: '' },
        guestCount: { hasError: false, errorMessage: '' },
        bevCost: { hasError: false, errorMessage: '' },
        formError: false,
    })

    React.useEffect(() => {
        if (totalBarRevenue > 0) {
            setTotalCommission(totalBarRevenue * CATERING_MARGIN * LIQUOR_STORE_MARGIN)
            setHasTotals(true)
        }
    }, [totalBarRevenue, setTotalCommission, setHasTotals])

    const validateField = (name, value) => {
        switch (name) {
            case 'eventNumber':
                if (!value || _.trim(value) === '') {
                    dispatch({
                        type: 'eventNumber',
                        payload: { hasError: true, errorMessage: 'Events per Year is required.' },
                    })
                    return false
                } else if (isNaN(eventNumber)) {
                    dispatch({
                        type: 'eventNumber',
                        payload: {
                            hasError: true,
                            errorMessage:
                                'Events per Year is not valid. Numbers must contain only digits and no other characters.',
                        },
                    })
                    return false
                } else {
                    dispatch({ type: 'eventNumber', payload: { hasError: false, errorMessage: '' } })
                    return true
                }
            case 'guestCount':
                if (!guestCount || _.trim(guestCount) === '') {
                    dispatch({
                        type: 'guestCount',
                        payload: { hasError: true, errorMessage: 'Guest Count is required.' },
                    })
                    return false
                } else if (isNaN(guestCount)) {
                    dispatch({
                        type: 'guestCount',
                        payload: {
                            hasError: true,
                            errorMessage:
                                'Guest Count is not valid. Numbers must contain only digits and no other characters.',
                        },
                    })
                    return false
                } else {
                    dispatch({ type: 'guestCount', payload: { hasError: false, errorMessage: '' } })
                    return true
                }
            case 'bevCost':
                if (!bevCost || _.trim(bevCost) === '') {
                    dispatch({
                        type: 'bevCost',
                        payload: { hasError: true, errorMessage: 'Beverage Cost per Person is required.' },
                    })
                    return false
                } else if (isNaN(bevCost)) {
                    dispatch({
                        type: 'bevCost',
                        payload: {
                            hasError: true,
                            errorMessage:
                                'Beverage Cost per Person is not valid. Numbers must contain only digits and no other characters.',
                        },
                    })
                    return false
                } else {
                    dispatch({ type: 'bevCost', payload: { hasError: false, errorMessage: '' } })
                    return true
                }
            default:
                break
        }
        return true
    }

    const validateForm = () => {
        let hasError = errorState.eventNumber.hasError || errorState.guestCount.hasError || errorState.bevCost.hasError
        // if none of the errors are set, check the individual fields as they may still be initial values
        if (!hasError) {
            if (!validateField('eventNumber', eventNumber)) {
                hasError = true
            }
            if (!validateField('guestCount', guestCount)) {
                hasError = true
            }
            if (!validateField('bevCost', bevCost)) {
                hasError = true
            }
        }
        dispatch({ type: 'formError', payload: hasError })
        return !hasError
    }

    const handleNumberOfEventsChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        validateField(name, value)
        setEventNumber(value)
    }

    const handleGuestCountChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        validateField(name, value)
        setGuestCount(value)
    }

    const handleBevCostChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        validateField(name, value)
        setBevCost(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (validateForm()) {
            setTotalBarRevenue(eventNumber * guestCount * bevCost)
            // see useEffect to update remaining state
        }
    }

    return (
        <>
            <div className='form-wrapper'>
                <div className='form-inner-wrapper'>
                    <form onSubmit={handleSubmit} className='calculator-form'>
                        {errorState.formError && (
                            <Error message={'Your form has encountered a problem. Please scroll down to review.'} />
                        )}
                        <div className='field-list clear'>
                            <div
                                className={`form-item field number required${
                                    errorState.formError && errorState.eventNumber ? ' error' : ''
                                }`}
                            >
                                {errorState.formError && errorState.eventNumber && (
                                    <Error message={errorState.eventNumber.errorMessage} />
                                )}
                                <label id='eventNumberLabel' className='title' htmlFor='eventNumber'>
                                    {'Events per Year '}
                                    <span className='required' aria-hidden='true'>
                                        *
                                    </span>
                                </label>
                                <div className='description'>Enter the average number of events hosted per year</div>
                                <input
                                    type='text'
                                    className='field-element'
                                    id='eventNumberInput'
                                    name='eventNumber'
                                    value={eventNumber}
                                    onChange={handleNumberOfEventsChange}
                                    spellCheck='false'
                                    aria-required='true'
                                />
                            </div>
                            <div
                                className={`form-item field number required${
                                    errorState.formError && errorState.guestCount ? ' error' : ''
                                }`}
                            >
                                {errorState.formError && errorState.guestCount && (
                                    <Error message={errorState.guestCount.errorMessage} />
                                )}
                                <label id='guestCountLabel' className='title' htmlFor='guestCount'>
                                    {'Guest Count '}
                                    <span className='required' aria-hidden='true'>
                                        *
                                    </span>
                                </label>
                                <div className='description'>Enter the average number of guests per single event</div>
                                <input
                                    type='text'
                                    className='field-element'
                                    id='guestCountInput'
                                    name='guestCount'
                                    value={guestCount}
                                    onChange={handleGuestCountChange}
                                    spellCheck='false'
                                    aria-required='true'
                                />
                            </div>
                            <div
                                className={`form-item field select required${
                                    errorState.formError && errorState.bevCost ? ' error' : ''
                                }`}
                            >
                                {errorState.formError && errorState.bevCost && (
                                    <Error message={errorState.bevCost.errorMessage} />
                                )}
                                <label id='bevCostLabel' className='title' htmlFor='bevCost'>
                                    {'Beverage Cost per Person '}
                                    <span className='required' aria-hidden='true'>
                                        *
                                    </span>
                                </label>
                                <div className='description'>
                                    This is a sample of our 4 hour pricing for our different packages. Try out a few to
                                    see your different earnings potentials
                                </div>
                                <select
                                    id='bevCostSelect'
                                    name='bevCost'
                                    value={bevCost}
                                    onChange={handleBevCostChange}
                                    aria-required='true'
                                >
                                    {BEVERAGE_PACKAGES.map((bp) => (
                                        <option key={bp} value={bp}>
                                            {bp}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-button-wrapper' data-animation-role='button'>
                                <input
                                    className='button sqs-system-button sqs-editable-button sqs-button-element--primary'
                                    type='submit'
                                    value='Calculate'
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {hasTotals && <CalculatorTotals totalBarRevenue={totalBarRevenue} totalCommission={totalCommission} />}
        </>
    )
}
