'use client'

import { Container } from '@/components/Container'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  // More people...
]

export function Overview() {
  const [responseData, setResponseData] = useState(null)

  const [data, setData] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Extract data from the router if needed, e.g., router.query
        const response = await fetch('http://127.0.0.1:5000/get_ideas')
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        setResponseData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, []) // Empty dependency array ensures this runs once after component mounts

  return (
    <Container>
      <div className="">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Users
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Resources
                    </th>
                    {/* <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* must revise */}
                  {responseData !== null ? (
                    // responseData.map((data) => (
                    //   <tr key={data.id}>
                    //     <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    //       {data.id}
                    //     </td>
                    //     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    //       {data.ideatext}
                    //     </td>
                    //     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    //       {data.resources}
                    //     </td>

                    //     <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    //       <a
                    //         href="#"
                    //         className="text-indigo-600 hover:text-indigo-900"
                    //       >
                    //         Edit
                    //         <span className="sr-only">, {data.id}</span>
                    //       </a>
                    //     </td>
                    //   </tr>
                    // ))
                    <h1>doesn't work</h1>
                  ) : (
                    <h1> LOADING... </h1>
                  )}
                  {/* {responseData.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.role}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
