const CHART_DATA = [
    {
        id: "dep-1",
        name: "Development",
        ticketCount: 10,
        colour: "#FF5630",
    },
    {
        id: "dep-2",
        name: "Human Resourcing",
        ticketCount: 35,
        colour: "#f0abab",
    },
    {
        id: "dep-3",
        name: "Marketing",
        ticketCount: 25,
        colour: "#36B37E",
    },
    {
        id: "dep-4",
        name: "Sales",
        ticketCount: 15,
        colour: "#00B8D9",
    },
    {
        id: "dep-5",
        name: "Customer Service",
        ticketCount: 20,
        colour: "#253858",
    },
    {
        id: "dep-6",
        name: "Finance",
        ticketCount: 5,
        colour: "#6554C0",
    },
    {
        id: "dep-7",
        name: "Legal",
        ticketCount: 10,
        colour: "#FFAB00",
    },
];

import { Chart } from "./chart";

export const AltassianChart = () => {
    return <Chart data={CHART_DATA} />;
};
