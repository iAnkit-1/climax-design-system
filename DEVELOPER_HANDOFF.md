# ClimaX Developer Handoff Package

## 🎨 Design System

### Color Tokens (HSL Format)

```css
/* Primary Colors - Deep Teal (Trust & Sustainability) */
--primary: 170 77% 24%
--primary-foreground: 0 0% 100%
--primary-light: 170 60% 35%
--primary-dark: 170 80% 18%

/* Accent Colors - Lime (Growth & Energy) */
--accent: 78 55% 61%
--accent-foreground: 218 41% 10%
--accent-light: 78 55% 75%
--accent-dark: 78 55% 45%

/* Neutrals */
--background: 210 25% 96%
--foreground: 218 41% 10%
--neutral-dark: 218 41% 10%
--neutral-medium: 215 15% 45%
--neutral-light: 210 20% 85%

/* Surface Colors */
--card: 0 0% 100%
--card-foreground: 218 41% 10%
--secondary: 170 25% 90%
--secondary-foreground: 170 77% 24%
--muted: 210 20% 92%
--muted-foreground: 215 15% 45%

/* Status Colors */
--success: 145 65% 45%
--warning: 45 93% 55%
--destructive: 0 75% 55%
--info: 210 85% 55%

/* Form Elements */
--border: 210 20% 85%
--input: 0 0% 100%
--ring: 170 77% 24%
```

### Spacing Scale

Use consistent spacing throughout the application:

```css
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-12: 3rem;    /* 48px */
```

### Border Radius

```css
--radius: 0.75rem;     /* 12px - Default */
--radius-sm: 0.5rem;   /* 8px - Small */
--radius-lg: 1rem;     /* 16px - Large */
```

### Typography

**Font Family:** Inter (sans-serif fallback)

**Font Sizes:**
- `h1`: 3rem (48px) - Page titles
- `h2`: 2.25rem (36px) - Section headers
- `h3`: 1.875rem (30px) - Subsection headers
- `h4`: 1.5rem (24px) - Card titles
- `h5`: 1.25rem (20px) - Small headers
- `h6`: 1.125rem (18px) - Labels
- Body: 1rem (16px)
- Small: 0.875rem (14px)
- Tiny: 0.75rem (12px)

### Shadows (Elevation)

```css
--shadow-sm: 0 1px 2px 0 rgba(15, 23, 36, 0.05)
--shadow-md: 0 4px 6px -1px rgba(15, 23, 36, 0.08), 0 2px 4px -1px rgba(15, 23, 36, 0.04)
--shadow-lg: 0 10px 15px -3px rgba(15, 23, 36, 0.1), 0 4px 6px -2px rgba(15, 23, 36, 0.05)
--shadow-xl: 0 20px 25px -5px rgba(15, 23, 36, 0.1), 0 10px 10px -5px rgba(15, 23, 36, 0.04)
```

## ♿ Accessibility Guidelines

### Touch Targets
- **Minimum size:** 44x44px for all interactive elements
- Mobile buttons should have adequate spacing (at least 8px between targets)
- Use `min-w-[44px] min-h-[44px]` classes on mobile

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Focus order follows logical reading order (top-to-bottom, left-to-right)
- Focus indicators clearly visible: `focus-visible:ring-2 focus-visible:ring-primary`
- Skip links provided for main navigation

### ARIA Labels
Always include ARIA labels for:
- Icon-only buttons: `aria-label="Close dialog"`
- Navigation regions: `role="navigation" aria-label="Main navigation"`
- Form inputs: `aria-describedby` for error messages
- Loading states: `aria-live="polite"` for status updates
- Current page: `aria-current="page"` for active nav links

### Color Contrast
All text meets WCAG AA standards:
- Normal text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI components: 3:1 minimum

### Form Inputs
- All inputs have associated labels
- Use autocomplete attributes for better UX:
  ```html
  <input type="email" autocomplete="email" />
  <input type="tel" autocomplete="tel" />
  <input type="text" autocomplete="name" />
  <input type="text" autocomplete="organization" />
  ```

### Error Handling
- Inline error messages below fields
- Error summary at form top for multiple errors
- Use `role="alert"` for critical errors
- Validation happens on blur and submit
- Success feedback uses toast notifications

## 📱 Mobile Navigation

Bottom tab navigation (visible only on mobile screens):

```tsx
import { MobileNav } from "@/components/MobileNav";

// In your layout component
<main className="pb-20 md:pb-0"> {/* Add padding for mobile nav */}
  {children}
</main>
<MobileNav />
```

Tabs:
1. **Home** - Dashboard
2. **Marketplace** - Browse credits
3. **Submit** - New project submission
4. **Wallet** - Transactions & balance
5. **Profile** - User settings

## 🌐 Internationalization (i18n)

Currently supports English and Hindi.

```tsx
import { useTranslation } from "@/i18n/translations";

function MyComponent() {
  const { t } = useTranslation('en'); // or 'hi'
  
  return <h1>{t.dashboard.title}</h1>;
}
```

### Adding New Languages
1. Add language code to `Language` type in `src/i18n/translations.ts`
2. Add complete translation object to `translations` record
3. Ensure all keys from `Translations` interface are implemented

## 🧩 Component Library

### Card Variants

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Project cards (marketplace listings)
<Card variant="project">
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>

// Credit certificates
<Card variant="credit">...</Card>

// Auditor profiles
<Card variant="auditor">...</Card>

// Transaction rows
<Card variant="transaction">...</Card>

// Minimal/flat
<Card variant="flat">...</Card>
```

### Button Variants

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">Default</Button>
<Button variant="primary">Primary CTA</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="accent">Accent</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

## 📋 Sample Component Wireframes

### ProjectCard

```tsx
interface ProjectCardProps {
  id: string;
  title: string;
  location: string;
  type: string;
  credits: number;
  pricePerCredit: number;
  vintage: number;
  verifier: string;
  status: "verified" | "pending" | "retired";
  seller: string;
  onBuyClick: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  location,
  type,
  credits,
  pricePerCredit,
  vintage,
  verifier,
  status,
  seller,
  onBuyClick,
}) => {
  return (
    <Card variant="project" role="article" aria-label={`Project: ${title}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant={status === "verified" ? "default" : "secondary"}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>Vintage {vintage}</span>
          </div>
          <div className="pt-3 border-t">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-muted-foreground">Price:</span>
              <div>
                <span className="text-2xl font-bold">₹{pricePerCredit}</span>
                <span className="text-xs text-muted-foreground ml-1">/ tCO₂e</span>
              </div>
            </div>
          </div>
          <Button 
            className="w-full"
            onClick={() => onBuyClick(id)}
            aria-label={`Buy credits from ${title}`}
          >
            Buy Credits
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
```

### MarketplaceGrid

```tsx
interface MarketplaceGridProps {
  projects: ProjectCardProps[];
  isLoading?: boolean;
  emptyMessage?: string;
  onProjectClick?: (id: string) => void;
}

export const MarketplaceGrid: React.FC<MarketplaceGridProps> = ({
  projects,
  isLoading = false,
  emptyMessage = "No projects found",
  onProjectClick,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-muted" />
            <CardContent className="space-y-3 pt-6">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="list"
      aria-label="Carbon credit projects"
    >
      {projects.map((project) => (
        <div key={project.id} role="listitem">
          <ProjectCard {...project} onBuyClick={onProjectClick || (() => {})} />
        </div>
      ))}
    </div>
  );
};
```

### WalletTable

```tsx
interface Transaction {
  id: string;
  type: "buy" | "sell" | "retire" | "topup" | "withdraw";
  date: string;
  projectName?: string;
  quantity: number;
  amount: number;
  status: "completed" | "pending" | "failed";
}

interface WalletTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
  onExportCSV?: () => void;
}

export const WalletTable: React.FC<WalletTableProps> = ({
  transactions,
  isLoading = false,
  onExportCSV,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        {onExportCSV && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onExportCSV}
            aria-label="Export transactions to CSV"
          >
            Export CSV
          </Button>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table 
          className="w-full"
          role="table"
          aria-label="Transaction history"
        >
          <thead>
            <tr className="border-b">
              <th scope="col" className="text-left p-3 text-sm font-medium">Date</th>
              <th scope="col" className="text-left p-3 text-sm font-medium">Type</th>
              <th scope="col" className="text-left p-3 text-sm font-medium">Project</th>
              <th scope="col" className="text-right p-3 text-sm font-medium">Quantity</th>
              <th scope="col" className="text-right p-3 text-sm font-medium">Amount</th>
              <th scope="col" className="text-center p-3 text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-muted/50">
                <td className="p-3 text-sm">{tx.date}</td>
                <td className="p-3 text-sm capitalize">{tx.type}</td>
                <td className="p-3 text-sm">{tx.projectName || "-"}</td>
                <td className="p-3 text-sm text-right">{tx.quantity}</td>
                <td className="p-3 text-sm text-right">₹{tx.amount.toLocaleString()}</td>
                <td className="p-3 text-center">
                  <Badge variant={tx.status === "completed" ? "default" : "secondary"}>
                    {tx.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

## 🎯 Naming Conventions

### Files & Folders
- Components: PascalCase (`ProjectCard.tsx`)
- Utilities: camelCase (`formatCurrency.ts`)
- Pages: PascalCase (`Marketplace.tsx`)
- Hooks: camelCase with `use` prefix (`useAuth.ts`)
- Types: PascalCase in separate file (`types.ts`)

### CSS Classes
- Use Tailwind utilities
- Custom classes: kebab-case (`project-card-header`)
- Component variants: descriptive (`card-project`, `button-primary`)

### Variables & Functions
- camelCase for variables and functions
- UPPER_CASE for constants
- Descriptive names: `handleBuyClick` not `onClick`
- Boolean prefixes: `isLoading`, `hasError`, `canSubmit`

### Props
- Event handlers: `onEventName` (`onClick`, `onSubmit`)
- Boolean props: `isDisabled`, `hasError`, `showModal`
- Render props: `renderItem`, `renderHeader`

## 🔧 Development Workflow

### Running Locally
```bash
npm install
npm run dev
```

### Building for Production
```bash
npm run build
npm run preview
```

### Code Quality
- ESLint configured for React + TypeScript
- Prettier for code formatting
- Pre-commit hooks for linting

### Testing Accessibility
- Use keyboard only (Tab, Enter, Escape, Arrows)
- Test with screen reader (NVDA, JAWS, VoiceOver)
- Check contrast ratios with browser DevTools
- Validate HTML with axe DevTools extension

## 📦 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── dashboard/       # Dashboard-specific components
│   ├── marketplace/     # Marketplace components
│   ├── wallet/          # Wallet components
│   ├── onboarding/      # Onboarding flow
│   └── MobileNav.tsx    # Mobile bottom navigation
├── pages/               # Route pages
├── hooks/               # Custom React hooks
├── lib/                 # Utilities
├── i18n/                # Translations
├── assets/              # Images, icons
└── types/               # TypeScript types
```

## 🚀 Deployment

Built on Vite + React + TypeScript, deployable to:
- Vercel
- Netlify
- AWS Amplify
- Custom server (static files)

Environment variables should be prefixed with `VITE_` to be accessible in the app.

---

## ⛓️ Blockchain Integration Guide

### Overview

All carbon credit transactions (buy, sell, retire, top-up, withdraw) must be recorded on blockchain to ensure **immutable transaction history** that cannot be changed or fabricated. This provides transparency, trust, and verifiability for all marketplace activities.

### Why Blockchain?

- **Immutability**: Once recorded, transactions cannot be altered or deleted
- **Transparency**: All stakeholders can verify transaction authenticity
- **Trust**: Buyers and sellers have cryptographic proof of ownership
- **Audit Trail**: Complete history of credit lifecycle (creation → purchase → retirement)
- **Compliance**: Meets international carbon credit registry standards

### Recommended Blockchain

**Polygon (Matic Network)** - Ethereum Layer 2 solution

**Why Polygon?**
- Low transaction fees (< ₹1 per transaction)
- Fast confirmation times (2-3 seconds)
- Ethereum compatibility (Solidity smart contracts)
- High throughput (7,000+ TPS)
- Carbon neutral blockchain
- Strong ecosystem and support in India

**Alternatives:**
- Ethereum Mainnet (higher fees, more established)
- Binance Smart Chain (centralized but fast)
- Algorand (carbon negative, purpose-built for sustainability)
- Celo (mobile-first, carbon offset built-in)

### Architecture

```
User Action (Frontend)
    ↓
Backend Validation
    ↓
Smart Contract Call
    ↓
Blockchain Transaction
    ↓
Transaction Hash Generated
    ↓
Store Hash in Database
    ↓
Update UI with Verification
```

### Smart Contract Requirements

#### 1. Carbon Credit Token Contract (ERC-1155)

Use **ERC-1155** (multi-token standard) to represent different carbon credit projects as unique token types.

```solidity
// Key functions needed:
- mint(projectId, quantity, recipient) 
- burn(projectId, quantity) // For retirement
- transfer(from, to, projectId, quantity)
- balanceOf(account, projectId)
- totalSupply(projectId)
```

**Why ERC-1155?**
- Each project can have its own token ID
- Batch transfers save gas
- Fungible within project, unique across projects
- Standard supports metadata (project details)

#### 2. Transaction Registry Contract

Record all marketplace transactions:

```solidity
struct Transaction {
    bytes32 transactionId;
    address buyer;
    address seller;
    uint256 projectId;
    uint256 quantity;
    uint256 amountINR;
    TransactionType txType; // BUY, SELL, RETIRE, TOPUP, WITHDRAW
    uint256 timestamp;
    string metadata; // JSON with project details
}

// Key functions:
- recordTransaction(Transaction)
- getTransactionHistory(address user)
- verifyTransaction(bytes32 txId)
```

#### 3. Retirement Certificate Contract

Permanently record retired credits:

```solidity
struct RetirementCertificate {
    bytes32 certificateId;
    address owner;
    uint256 projectId;
    uint256 quantity;
    string reason; // Corporate CSR, personal offset, etc.
    uint256 retirementDate;
    string metadata;
}

// Key functions:
- issueRetirementCertificate(projectId, quantity, reason)
- getCertificate(certificateId)
- getRetirementsByOwner(address)
```

### Backend Implementation Steps

#### Step 1: Set Up Web3 Infrastructure

**Required npm packages:**
```bash
npm install ethers@6.13.0
npm install @polygon/polygon-sdk
npm install dotenv
```

**Environment Variables:**
```env
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_admin_wallet_private_key
CARBON_CREDIT_CONTRACT_ADDRESS=0x...
TRANSACTION_REGISTRY_ADDRESS=0x...
RETIREMENT_CONTRACT_ADDRESS=0x...
```

**Get RPC URL from:**
- Alchemy (https://www.alchemy.com/)
- Infura (https://www.infura.io/)
- QuickNode (https://www.quicknode.com/)

#### Step 2: Create Blockchain Service Layer

```typescript
// services/blockchain.service.ts

import { ethers } from 'ethers';

class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private carbonCreditContract: ethers.Contract;
  private registryContract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      process.env.POLYGON_RPC_URL
    );
    
    this.wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY!,
      this.provider
    );

    // Initialize contracts with ABIs
    this.carbonCreditContract = new ethers.Contract(
      process.env.CARBON_CREDIT_CONTRACT_ADDRESS!,
      CARBON_CREDIT_ABI,
      this.wallet
    );

    this.registryContract = new ethers.Contract(
      process.env.TRANSACTION_REGISTRY_ADDRESS!,
      REGISTRY_ABI,
      this.wallet
    );
  }

  // Record buy transaction
  async recordBuyTransaction(
    buyerAddress: string,
    sellerAddress: string,
    projectId: number,
    quantity: number,
    amountINR: number
  ) {
    try {
      // Transfer tokens from seller to buyer
      const transferTx = await this.carbonCreditContract.safeTransferFrom(
        sellerAddress,
        buyerAddress,
        projectId,
        quantity,
        ethers.toUtf8Bytes('')
      );
      
      await transferTx.wait();

      // Record in registry
      const registryTx = await this.registryContract.recordTransaction(
        ethers.id(`${Date.now()}-${buyerAddress}`), // Generate unique ID
        buyerAddress,
        sellerAddress,
        projectId,
        quantity,
        amountINR,
        0, // TransactionType.BUY
        Math.floor(Date.now() / 1000),
        JSON.stringify({ projectId, quantity })
      );

      const receipt = await registryTx.wait();
      
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString()
      };
    } catch (error) {
      console.error('Blockchain transaction failed:', error);
      throw error;
    }
  }

  // Retire credits
  async retireCredits(
    ownerAddress: string,
    projectId: number,
    quantity: number,
    reason: string
  ) {
    try {
      // Burn tokens (permanent retirement)
      const burnTx = await this.carbonCreditContract.burn(
        ownerAddress,
        projectId,
        quantity
      );
      
      await burnTx.wait();

      // Issue retirement certificate
      const certificateId = ethers.id(`CERT-${Date.now()}-${ownerAddress}`);
      
      const certTx = await this.retirementContract.issueRetirementCertificate(
        certificateId,
        ownerAddress,
        projectId,
        quantity,
        reason,
        Math.floor(Date.now() / 1000),
        JSON.stringify({ projectId, quantity, reason })
      );

      const receipt = await certTx.wait();

      return {
        success: true,
        certificateId,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error('Retirement failed:', error);
      throw error;
    }
  }

  // Get transaction history
  async getTransactionHistory(userAddress: string) {
    try {
      const history = await this.registryContract.getTransactionHistory(
        userAddress
      );
      
      return history.map((tx: any) => ({
        transactionId: tx.transactionId,
        buyer: tx.buyer,
        seller: tx.seller,
        projectId: tx.projectId.toString(),
        quantity: tx.quantity.toString(),
        amountINR: tx.amountINR.toString(),
        type: this.getTransactionTypeName(tx.txType),
        timestamp: new Date(tx.timestamp.toNumber() * 1000),
        metadata: JSON.parse(tx.metadata)
      }));
    } catch (error) {
      console.error('Failed to fetch history:', error);
      throw error;
    }
  }

  // Verify transaction authenticity
  async verifyTransaction(txHash: string) {
    try {
      const receipt = await this.provider.getTransactionReceipt(txHash);
      
      if (!receipt) {
        return { verified: false, message: 'Transaction not found' };
      }

      return {
        verified: true,
        blockNumber: receipt.blockNumber,
        from: receipt.from,
        to: receipt.to,
        status: receipt.status === 1 ? 'success' : 'failed',
        gasUsed: receipt.gasUsed.toString()
      };
    } catch (error) {
      console.error('Verification failed:', error);
      return { verified: false, message: 'Verification error' };
    }
  }

  private getTransactionTypeName(type: number): string {
    const types = ['buy', 'sell', 'retire', 'topup', 'withdraw'];
    return types[type] || 'unknown';
  }
}

export const blockchainService = new BlockchainService();
```

#### Step 3: Create API Endpoints

```typescript
// api/transactions.ts

import { blockchainService } from '../services/blockchain.service';
import { db } from '../database'; // Your database instance

// POST /api/transactions/buy
export async function handleBuyCredits(req, res) {
  const { buyerId, sellerId, projectId, quantity, amountINR } = req.body;

  try {
    // 1. Validate payment completed
    const paymentValid = await validatePayment(buyerId, amountINR);
    if (!paymentValid) {
      return res.status(400).json({ error: 'Payment not verified' });
    }

    // 2. Get wallet addresses from database
    const buyer = await db.users.findById(buyerId);
    const seller = await db.users.findById(sellerId);

    // 3. Record on blockchain
    const blockchainResult = await blockchainService.recordBuyTransaction(
      buyer.walletAddress,
      seller.walletAddress,
      projectId,
      quantity,
      amountINR
    );

    // 4. Update database with blockchain hash
    await db.transactions.create({
      id: generateId(),
      buyerId,
      sellerId,
      projectId,
      quantity,
      amountINR,
      type: 'buy',
      status: 'completed',
      blockchainHash: blockchainResult.transactionHash,
      blockchainNetwork: 'Polygon',
      blockNumber: blockchainResult.blockNumber,
      createdAt: new Date()
    });

    // 5. Update user balances
    await db.users.updateBalance(buyerId, quantity, 'add');
    await db.users.updateBalance(sellerId, quantity, 'subtract');

    res.json({
      success: true,
      transactionHash: blockchainResult.transactionHash,
      explorerUrl: `https://polygonscan.com/tx/${blockchainResult.transactionHash}`
    });
  } catch (error) {
    console.error('Transaction failed:', error);
    res.status(500).json({ error: 'Transaction failed', details: error.message });
  }
}

// POST /api/transactions/retire
export async function handleRetireCredits(req, res) {
  const { userId, projectId, quantity, reason } = req.body;

  try {
    // 1. Verify user owns credits
    const balance = await db.users.getCreditBalance(userId, projectId);
    if (balance < quantity) {
      return res.status(400).json({ error: 'Insufficient credits' });
    }

    // 2. Get wallet address
    const user = await db.users.findById(userId);

    // 3. Retire on blockchain
    const result = await blockchainService.retireCredits(
      user.walletAddress,
      projectId,
      quantity,
      reason
    );

    // 4. Update database
    await db.transactions.create({
      id: generateId(),
      userId,
      projectId,
      quantity,
      type: 'retire',
      status: 'completed',
      blockchainHash: result.transactionHash,
      certificateId: result.certificateId,
      reason,
      createdAt: new Date()
    });

    // 5. Update balance
    await db.users.updateBalance(userId, quantity, 'subtract');

    res.json({
      success: true,
      certificateId: result.certificateId,
      transactionHash: result.transactionHash,
      explorerUrl: `https://polygonscan.com/tx/${result.transactionHash}`
    });
  } catch (error) {
    console.error('Retirement failed:', error);
    res.status(500).json({ error: 'Retirement failed', details: error.message });
  }
}

// GET /api/transactions/verify/:hash
export async function verifyTransaction(req, res) {
  const { hash } = req.params;

  try {
    const verification = await blockchainService.verifyTransaction(hash);
    res.json(verification);
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
}
```

#### Step 4: User Wallet Setup

Each user needs a blockchain wallet address:

**Option A: Custodial Wallets (Recommended for MVP)**
- Create wallet addresses on behalf of users
- Store encrypted private keys securely (use AWS KMS, HashiCorp Vault)
- Simpler UX - users don't manage keys

**Option B: Non-Custodial (Web3 Integration)**
- Users connect MetaMask or WalletConnect
- Users sign transactions themselves
- More decentralized but complex UX

```typescript
// services/wallet.service.ts

import { ethers } from 'ethers';
import { encryptPrivateKey, decryptPrivateKey } from './encryption';

export async function createUserWallet(userId: string) {
  // Generate new wallet
  const wallet = ethers.Wallet.createRandom();

  // Encrypt private key before storing
  const encryptedKey = await encryptPrivateKey(wallet.privateKey, userId);

  // Store in database
  await db.wallets.create({
    userId,
    address: wallet.address,
    encryptedPrivateKey: encryptedKey,
    network: 'Polygon',
    createdAt: new Date()
  });

  return {
    address: wallet.address,
    // NEVER return private key to client
  };
}

export async function getUserWallet(userId: string) {
  const walletData = await db.wallets.findByUserId(userId);
  
  if (!walletData) {
    throw new Error('Wallet not found');
  }

  // Decrypt private key for transactions
  const privateKey = await decryptPrivateKey(
    walletData.encryptedPrivateKey,
    userId
  );

  return new ethers.Wallet(privateKey);
}
```

### Frontend Integration

#### Update Transaction Interface

Already implemented in `src/pages/Wallet.tsx`:

```typescript
interface Transaction {
  id: string;
  date: string;
  type: "buy" | "sell" | "retire" | "topup" | "withdraw";
  projectName?: string;
  quantity?: number;
  amount: number;
  status: "completed" | "pending" | "processing";
  blockchainHash?: string;
  blockchainNetwork?: string;
}
```

#### Display Blockchain Verification

Already implemented - shows blockchain hash with link to Polygonscan:

```tsx
{txn.blockchainHash && (
  <div className="flex items-center gap-1.5">
    <CheckCircle2 className="w-3 h-3 text-success" />
    <a
      href={`https://polygonscan.com/tx/${txn.blockchainHash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-primary hover:underline"
    >
      Blockchain Verified <ExternalLink className="w-3 h-3" />
    </a>
  </div>
)}
```

### Security Considerations

1. **Private Key Management**
   - Never expose private keys in frontend
   - Use hardware security modules (HSM) for production
   - Implement key rotation policies
   - Use multi-signature wallets for high-value operations

2. **Transaction Validation**
   - Validate on backend before blockchain call
   - Check balances before transfers
   - Implement rate limiting
   - Add transaction approval workflows for large amounts

3. **Smart Contract Security**
   - Audit contracts before deployment (CertiK, OpenZeppelin)
   - Use OpenZeppelin libraries for standard functionality
   - Implement emergency pause mechanism
   - Add role-based access control

4. **Gas Fee Management**
   - Monitor gas prices and adjust
   - Implement gas price oracles
   - Batch transactions when possible
   - Consider meta-transactions (gasless for users)

### Cost Estimation

**Polygon Network (Mainnet):**
- Mint credits: ~₹0.50 - ₹2 per transaction
- Transfer credits: ~₹0.30 - ₹1 per transaction
- Burn (retire): ~₹0.40 - ₹1.50 per transaction
- Registry record: ~₹0.20 - ₹0.80 per transaction

**Monthly costs for 1000 transactions:**
- ~₹500 - ₹2,000 in gas fees
- RPC provider (Alchemy/Infura): ₹0 - ₹4,000 (free tier available)

### Testing

1. **Testnet Testing**
   - Use Polygon Mumbai testnet first
   - Get test MATIC from faucet: https://faucet.polygon.technology/
   - Test all transaction types thoroughly

2. **Load Testing**
   - Simulate high transaction volume
   - Test concurrent transactions
   - Monitor gas price spikes

3. **Security Testing**
   - Penetration testing on API endpoints
   - Smart contract audits
   - Private key storage verification

### Monitoring & Maintenance

1. **Transaction Monitoring**
   - Set up alerts for failed transactions
   - Monitor gas prices
   - Track contract events
   - Log all blockchain interactions

2. **Dashboard Metrics**
   - Total transactions recorded
   - Gas fees spent
   - Success/failure rates
   - Average confirmation times

3. **Backup & Recovery**
   - Regular database backups with blockchain hashes
   - Sync blockchain state periodically
   - Implement transaction replay mechanism

### Compliance & Standards

- **Verra Registry Integration**: Ensure blockchain records align with Verra standards
- **Gold Standard Compatibility**: Support Gold Standard carbon credit tracking
- **ISO 14064**: Follow greenhouse gas accounting standards
- **UNFCCC Requirements**: Meet UN Framework Convention requirements

### Resources

- **Polygon Documentation**: https://docs.polygon.technology/
- **Ethers.js Docs**: https://docs.ethers.org/v6/
- **OpenZeppelin Contracts**: https://docs.openzeppelin.com/contracts/
- **Carbon Credit Tokenization Guide**: https://www.toucan.earth/docs
- **Blockchain Carbon Accounting**: https://www.climatechaincoa lition.io/

---

For questions or clarifications, refer to inline code comments or the project README.
