import React from 'react'

const Arrow = ({title}: {title: string}) => {
    const arrowStyle: React.CSSProperties = {
        position: 'relative',
        width: '', // Width of the rectangular body
        minWidth: "120px",
        height: '50px', // Height of the rectangular body
        margin: '50px', // Optional: Add margin to center the arrow
        backgroundColor: "#febd59"
    };

    const arrowHeadStyle: React.CSSProperties = {
        content: '""', // Required for pseudo-elements, but won't work directly in inline styles
        position: 'absolute',
        top: 0,
        right: '-25px', // Adjust this value to change the point's position
        width: 0,
        height: 0,
        borderTop: '25px solid transparent', // Top side of the triangle
        borderBottom: '25px solid transparent', // Bottom side of the triangle
        borderLeft: '25px solid #febd59', // Color of the arrowhead
    };
    return (
        <div>
            <div style={arrowStyle} className='flex items-center p-4 text-xl'>
                {title}
                <div style={arrowHeadStyle} className=''></div>
            </div>
        </div>
    )
}

export default Arrow
