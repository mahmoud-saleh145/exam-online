'use client'
import Link from 'next/link';
import { Grid } from 'react-virtualized';
export default function Card(props) {
    const data = props.data
    const CARD_WIDTH = 370; // Card width
    const CARD_HEIGHT = 500; // Card height
    const COLUMN_COUNT = 3; // Cards per row
    const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
        const index = rowIndex * COLUMN_COUNT + columnIndex;
        if (index >= data.length) return null;

        return (
            <div key={key} style={{ ...style, padding: "10px" }}>

                <Link href={{
                    pathname: '/quiz',
                    query: {
                        id: data[index]._id
                    }
                }}>
                    <div key={data[index]._id} className="position-relative cursor-pointer" >
                        <img src={data[index].icon} className="w-100"></img>
                        <h5 className="position-absolute title w-75 text-white p-4">{data[index].name}</h5>
                    </div>
                </Link >
            </div>
        );
    };
    return (
        <>

            {data.length > 0 ? (
                <Grid
                    cellRenderer={cellRenderer}
                    columnCount={COLUMN_COUNT}
                    columnWidth={CARD_WIDTH}
                    height={330} // Two rows visible
                    rowCount={2}
                    rowHeight={340}
                    width={1150} // Three cards per row
                />
            ) : (
                <h2>Loading...</h2>
            )
            }
        </>
    )
}
