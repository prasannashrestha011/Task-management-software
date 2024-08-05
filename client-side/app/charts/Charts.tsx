"use client"; // Ensures this component is rendered only on the client side

import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// Define the type for the product sales data
interface ProductSales {
    name: string;
    product1: number;
    product2: number;
}

const Charts = () => {
    const [productSales, setProductSales] = useState<ProductSales[]>([]);

    useEffect(() => {
        // Setting the data only after the component is mounted on the client side
        setProductSales([
            { name: "January", product1: 5500, product2: 4000 },
            { name: "February", product1: 6000, product2: 4500 },
            { name: "March", product1: 7000, product2: 5000 },
            { name: "April", product1: 8000, product2: 5500 },
            { name: "May", product1: 7500, product2: 6000 },
            { name: "June", product1: 9000, product2: 6500 },
            { name: "July", product1: 8500, product2: 7000 },
            { name: "August", product1: 9500, product2: 7500 },
            { name: "September", product1: 10000, product2: 8000 },
            { name: "October", product1: 10500, product2: 8500 },
            { name: "November", product1: 11000, product2: 9000 },
            { name: "December", product1: 11500, product2: 9500 }
        ]);
    }, []);

    return (
        <ResponsiveContainer width="100%" height={500}>
            <AreaChart data={productSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="product1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="product2" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default Charts;
