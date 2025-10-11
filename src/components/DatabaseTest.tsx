'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export function DatabaseTest() {
  const [results, setResults] = useState<string[]>([])

  const testConnection = async () => {
    const newResults: string[] = []

    try {
      // Test basic connection
      const { error: testError } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
      
      if (testError) {
        newResults.push(`❌ Connection test failed: ${testError.message}`)
      } else {
        newResults.push('✅ Connection successful')
      }

      // Check if tables exist
      const tables = ['profiles', 'levels', 'non_negotiables', 'timeline_data']
      
      for (const table of tables) {
        try {
          const { data, error } = await supabase
            .from(table)
            .select('*')
            .limit(1)
          
          if (error) {
            newResults.push(`❌ Table '${table}': ${error.message}`)
          } else {
            newResults.push(`✅ Table '${table}': OK (${data?.length || 0} rows)`)
          }
        } catch (err) {
          newResults.push(`❌ Table '${table}': ${err}`)
        }
      }

      // Check current user
      const { data: user } = await supabase.auth.getUser()
      if (user.user) {
        newResults.push(`✅ Current user: ${user.user.email}`)
        
        // Check if profile exists
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.user.id)
          .single()
        
        if (profileError) {
          newResults.push(`❌ Profile check: ${profileError.message}`)
        } else if (profile) {
          newResults.push(`✅ Profile exists: Admin=${profile.is_admin}`)
        } else {
          newResults.push('❌ No profile found')
        }
      } else {
        newResults.push('❌ No authenticated user')
      }

    } catch (error) {
      newResults.push(`❌ General error: ${error}`)
    }

    setResults(newResults)
  }


  return (
    <div className="fixed top-20 left-4 bg-white p-4 rounded-lg shadow-lg z-50 max-w-md">
      <h3 className="font-bold mb-4">Database Debug</h3>
      
      <div className="space-y-2 mb-4">
        <button 
          onClick={testConnection}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Test Connection
        </button>
      </div>
      
      <div className="bg-gray-100 p-2 rounded max-h-60 overflow-y-auto">
        <pre className="text-xs">
          {results.join('\n')}
        </pre>
      </div>
    </div>
  )
}