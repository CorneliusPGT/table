import { ChangeEvent, useEffect, useState } from "react";
import { DataT } from "./App";

interface TableProps {
    small: DataT[];
}

type SortType = {
    key: keyof DataT | null;
    direction: "asc" | "desc" | "none";
};

export const Table = ({ small }: TableProps) => {
    const [sortedData, setSortedData] = useState<DataT[]>(small);
    const [searchF, setSearchF] = useState<string>('')
    const [sortConfig, setSort] = useState<SortType>({
        key: null,
        direction: "none",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setSearchF(value)
    }

    const resortArr = (key: keyof DataT | null, direction: "asc" | "desc" | "none", filter: string = '') => {
        let filtered = small.filter((c) =>
            Object.values(c).some(value =>
                String(value).toLowerCase().includes(filter.toLowerCase())
            ))
        if (key === null) return filtered;



        const sorted = filtered.sort((a, b) => {
            if (direction === "asc") {
                if (typeof a[key] === "number" && typeof b[key] === "number") {
                    return a[key] - b[key];
                } else {
                    return String(a[key]).localeCompare(String(b[key]));
                }
            } else if (direction === "desc") {
                if (typeof a[key] === "number" && typeof b[key] === "number") {
                    return b[key] - a[key];
                } else {
                    return String(b[key]).localeCompare(String(a[key]));
                }
            }
            return 0;
        })
        

        return sorted;
    };

    const configSort = (s: keyof DataT) => {
        let direction: "asc" | "desc" | "none" = "none";

        if (s !== sortConfig.key || sortConfig.direction === "none" || sortConfig.direction === "desc") {
            direction = "asc";
        } else {
            direction = "desc";
        }

        setSort({ key: s, direction });
    };

    useEffect(() => {
        if (sortConfig.key !== null) {
            setSortedData(resortArr(sortConfig.key, sortConfig.direction, searchF));
        } else {
            setSortedData(resortArr(sortConfig.key, sortConfig.direction, searchF));
        }
    }, [small, sortConfig, searchF]);

    return <table>
        <thead>
            <tr>
                <input onChange={handleChange} type="text" value={searchF} id="search" />
               
            </tr>
            <tr>
                <th onClick={() => configSort('id')}>id {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
                <th onClick={() => configSort('firstName')}>firstName {sortConfig.key === 'firstName' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
                <th onClick={() => configSort('lastName')}>lastName {sortConfig.key === 'lastName' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
                <th onClick={() => configSort('email')}>email {sortConfig.key === 'email' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
                <th onClick={() => configSort('phone')}>phone {sortConfig.key === 'phone' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
            </tr>
        </thead>
        <tbody>

            {sortedData.map((c, ind) => {
                return (
                    <tr key={ind}>
                        <td> {c.id} </td>
                        <td>{c.firstName} </td>
                        <td>{c.lastName} </td>
                        <td>{c.email} </td>
                        <td>{c.phone} </td>
                    </tr>

                );
            })}
        </tbody>

    </table>
}