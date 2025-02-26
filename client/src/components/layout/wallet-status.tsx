import { motion, AnimatePresence } from "framer-motion";
import { Wallet } from "lucide-react";

interface WalletStatusProps {
  isConnected: boolean;
}

export function WalletStatus({ isConnected }: WalletStatusProps) {
  return (
    <div className="relative flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={isConnected ? "connected" : "disconnected"}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative"
        >
          <motion.div
            animate={{
              scale: isConnected ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`p-2 rounded-full ${
              isConnected 
                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                : "bg-gradient-to-r from-gray-400 to-gray-500"
            }`}
          >
            <Wallet className="h-5 w-5 text-white" />
          </motion.div>
          
          {/* Status indicator dot */}
          <motion.div
            className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ${
              isConnected ? "bg-green-400" : "bg-gray-400"
            }`}
            animate={{
              scale: isConnected ? [1, 1.2, 1] : 1,
              opacity: isConnected ? 1 : 0.5,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
