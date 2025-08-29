# 🤖 shadcn MCP Setup Guide for Cursor

## 🎯 **What We've Installed**

✅ **shadcn CLI**: `npm install -g shadcn`  
✅ **shadcn MCP Server**: `npm install -g @jpisnice/shadcn-ui-mcp-server`  
✅ **Global Access**: Both tools are now available system-wide

## 🌐 **Setting Up shadcn MCP Globally in Cursor**

### **Step 1: Configure Cursor MCP Settings**

1. **Open Cursor Settings**:
   - Press `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux)
   - Navigate to **Extensions** → **MCP**

2. **Add Global MCP Configuration**:
   ```json
   {
     "mcpServers": {
       "shadcn": {
         "command": "npx",
         "args": ["@jpisnice/shadcn-ui-mcp-server"],
         "env": {}
       }
     }
   }
   ```

### **Step 2: Alternative Configuration Methods**

#### **Method A: User Settings File (Recommended)**
- **Mac**: `~/Library/Application Support/Cursor/User/settings.json`
- **Windows**: `%APPDATA%\Cursor\User\settings.json`
- **Linux**: `~/.config/Cursor/User/settings.json`

Add this to your settings.json:
```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["@jpisnice/shadcn-ui-mcp-server"],
      "env": {}
    }
  }
}
```

#### **Method B: Workspace Settings**
Create `.vscode/settings.json` in your project:
```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["@jpisnice/shadcn-ui-mcp-server"],
      "env": {}
    }
  }
}
```

### **Step 3: Restart Cursor**

After adding the MCP configuration, restart Cursor for the changes to take effect.

## 🚀 **Setting Up shadcn/ui in Your Project**

### **Step 1: Initialize shadcn/ui**

```bash
# Navigate to your project directory
cd /Users/andersonedmond/Desktop/clubdisplayvideo

# Initialize shadcn/ui
npx shadcn@latest init
```

**Configuration Options**:
- **Style**: `Default` (or `New York` for modern look)
- **Base color**: `Slate` (or `Zinc` for futuristic feel)
- **CSS variables**: `Yes`
- **Tailwind CSS**: `Yes` (already installed)
- **Components directory**: `src/components/ui`
- **Utils directory**: `src/lib/utils`
- **Include CSS**: `Yes`
- **Include React Server Components**: `No` (Vite project)

### **Step 2: Install Required Components**

```bash
# Core components for robovision UI
npx shadcn@latest add button
npx shadcn@latest add select
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add progress
npx shadcn@latest add separator
npx shadcn@latest add tooltip
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add switch
npx shadcn@latest add slider
```

### **Step 3: Install Additional Dependencies**

```bash
# Animation and effects
npm install framer-motion lucide-react

# Radix UI primitives (if needed)
npm install @radix-ui/react-slot @radix-ui/react-select
```

## 🔧 **MCP Configuration Verification**

### **Test MCP Connection**

1. **Restart Cursor** after configuration
2. **Open Command Palette**: `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P`
3. **Search for MCP**: Look for MCP-related commands
4. **Check Output Panel**: Look for MCP server connection messages

### **Verify shadcn MCP Access**

The MCP server should now provide:
- ✅ **Component documentation** and examples
- ✅ **Best practices** for shadcn/ui usage
- ✅ **Component source code** and variants
- ✅ **Accessibility guidelines** and patterns

## 🎨 **Project-Specific Configuration**

### **Update Tailwind Config**

Your `tailwind.config.js` will be updated with:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... more color variables
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### **CSS Variables**

Your `src/index.css` will include:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    /* ... more variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode variables */
  }
}
```

## 🚨 **Troubleshooting**

### **Common Issues**

1. **MCP Server Not Connecting**:
   - Verify the command path in settings
   - Check if `npx` is available globally
   - Restart Cursor after configuration

2. **Components Not Installing**:
   - Ensure you're in the project directory
   - Check Node.js version compatibility
   - Verify Tailwind CSS is properly configured

3. **Styling Conflicts**:
   - Remove conflicting CSS imports
   - Ensure proper CSS variable precedence
   - Check Tailwind CSS purging

### **Verification Commands**

```bash
# Check global installations
npm list -g | grep shadcn

# Verify MCP server
npx @jpisnice/shadcn-ui-mcp-server --help

# Check project setup
npx shadcn@latest --help
```

## 🎯 **Next Steps**

After completing this setup:

1. ✅ **MCP Server**: Available globally in Cursor
2. ✅ **shadcn/ui**: Ready for robovision UI implementation
3. ✅ **Components**: All necessary UI components installed
4. ✅ **Configuration**: Tailwind and CSS properly configured

## 🔮 **Ready for Robovision UI!**

Your project is now ready for the futuristic robovision UI redesign using shadcn/ui components. The MCP server will provide AI assistance for:

- **Component selection** and usage
- **Best practices** and patterns
- **Accessibility guidelines**
- **Customization options**
- **Performance optimization**

---

**Status**: 🚀 **READY FOR IMPLEMENTATION**
**MCP Server**: ✅ **Installed and Configured**
**shadcn/ui**: ✅ **Ready for Project Setup**
**Next Phase**: **Robovision UI Redesign**
