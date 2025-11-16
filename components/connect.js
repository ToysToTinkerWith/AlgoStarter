import React, { useState, useEffect } from 'react'
import { useWallet } from '@txnlab/use-wallet-react'

import { Button, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function Connect(props) {
  const {
    wallets,
    activeWallet,
    activeAddress,
    isReady,
    signTransactions,
    transactionSigner,
    algodClient,
  } = useWallet()

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Avoid SSR/client mismatch
  if (!hasMounted || !isReady) {
    return null  // or a loading spinner/skeleton
  }

  return (
    <div>
      <div>
        {wallets?.map((provider) => (
          <div key={'provider-' + provider.id} style={{ margin: 30 }}>
            <Typography>
              <img
                width={30}
                height={30}
                style={{ margin: 10, color: "#FAFAFA", borderRadius: 15 }}
                alt=""
                src={provider.metadata.icon}
              />
              {provider.metadata.name} {provider.isActive && '[active]'}
            </Typography>
            <div style={{ padding: 20 }}>
              <hr />
              <Button
                variant="outlined"
                style={{ borderRadius: 15, margin: 10 }}
                onClick={provider.connect}
                disabled={provider.isConnected}
              >
                Connect
              </Button>
              <Button
                style={{ margin: 10 }}
                onClick={provider.disconnect}
                disabled={!provider.isConnected}
              >
                Disconnect
              </Button>
              <Button
                style={{ margin: 10 }}
                onClick={provider.setActiveAccount}
                disabled={!provider.isConnected || provider.isActive}
              >
                Set Active
              </Button>
            </div>
          </div>
        ))}
      </div>
      {activeAddress && (
        <Typography align="center">{activeAddress}</Typography>
      )}
    </div>
  )
}
