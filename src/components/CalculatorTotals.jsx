import React from "react"

export const CalculatorTotals = ({totalBarRevenue, totalCommission}) => {
    return (
        <div className="sqs-block html-block sqs-block-html">
            <div className="sqs-block-content">
                <p style={{textAlign: 'center', whiteSpace: 'pre-wrap'}}>{`Total Bar Revenue: $${totalBarRevenue}`}</p>
                <p style={{textAlign: 'center', whiteSpace: 'pre-wrap'}}>{`Commission: $${totalCommission}`}</p>
            </div>
        </div>
    )
}
