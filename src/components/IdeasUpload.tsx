'use client'

//this needs to be MUCH MUCH BETTER and more secure and stuff

import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import * as Papa from 'papaparse'

export function IdeasUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const router = useRouter() // Hook to control routing

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0]) {
      setFile(files[0])
      setFileName(files[0].name) // Store the file name
    }
  }
  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async () => {
    if (file) {
      Papa.parse(file, {
        complete: async (results) => {
          // Skip the first row. If the first row is at index 0, start from index 1
          const ideasList = results.data.slice(1).flat()
          const userid = Math.floor(10000 + Math.random() * 90000).toString()
          const data = { userid, ideasList }

          console.log(data)
          try {
            const response = await fetch(
              'http://127.0.0.1:5000/generate_ideas',
              {
                method: 'POST',
                mode: 'cors', // defaults to same-origin
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              },
            )

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`)
            }

            // You can process the response further if needed
            const responseData = await response.json()
            console.log('Response data:', responseData)
            // Redirect on successful fetch
            router.push('/analysis/overview') // Replace with your desired path
          } catch (error) {
            console.error('Error sending data:', error)
          }
        },
        header: false,
      })
    }
  }
  return (
    <Container className="py-12 lg:py-20">
      <div>
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          Upload Data
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          You haven’t uploaded any business solutions data yet. Get started by
          uploading a single-column .csv file, where the first row is a header
          such as "Business Ideas".
        </p>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="absolute h-0 w-0 opacity-0"
          accept=".csv"
        ></input>
        <button
          type="button"
          onClick={handleButtonClick}
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="mx-auto h-12 w-12 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
            />
          </svg>

          <span className="mt-2 block text-sm font-semibold text-gray-900">
            Upload csv file
          </span>
        </button>
        {fileName && (
          <div className="mt-2 text-sm text-green-600">
            Uploaded: {fileName}
          </div>
        )}
        {/* add remove functionality later */}
        <button
          onClick={handleSubmit}
          className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Submit
        </button>
        {/* <div className="mt-4 flex">
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Or start from an empty project
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div> */}
      </div>
    </Container>
  )
}
