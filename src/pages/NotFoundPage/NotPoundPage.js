import React from 'react'
import './NotFoundPage.css'

export default function NotPoundPage() {
  return (
<div>
  <meta charSet="UTF-8" />
  <title>market-wp.com</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />
  <div id="oopss">
    <div id="error-text">
      <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt={404} />
      <span>404 PAGE</span>
      <p className="p-a">
        . The page you were looking for could not be found</p>
      <p className="p-b">
        ... Back to previous page
      </p>
      <a href="/" className="back">... Back to previous page</a>
    </div>
  </div>
</div>

    
  )
}
