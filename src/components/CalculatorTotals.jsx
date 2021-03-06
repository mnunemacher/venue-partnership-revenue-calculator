import React from 'react'

export const CalculatorTotals = ({ totalBarRevenue, totalCommission }) => {
    const formatTotal = (total) => {
        if (isNaN(total)) total = 0.0
        total = total.toFixed(2)

        const [dollars, cents] = total.split('.')
        return `$${dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${cents}`
    }

    return (
        <div className='sqs-block html-block sqs-block-html'>
            <div className='sqs-block-content'>
                <h3 style={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}>
                    {`Total Bar Revenue: ${formatTotal(totalBarRevenue)}`}
                </h3>
                <h3 style={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}>
                    {`Commission: ${formatTotal(totalCommission)}`}
                </h3>
            </div>
        </div>
    )
}
