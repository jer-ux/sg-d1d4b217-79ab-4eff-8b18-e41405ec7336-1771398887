"""
KINCAID HEALTH™ AIOS
Redis Cache Service
"""

import redis
import json
from typing import Any, Optional
import structlog

from app.config import settings

logger = structlog.get_logger()

class CacheService:
    def __init__(self):
        self.redis_client = redis.from_url(
            settings.REDIS_URL,
            decode_responses=True
        )
        logger.info("redis_connected", url=settings.REDIS_URL)
    
    def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        try:
            value = self.redis_client.get(key)
            if value:
                return json.loads(value)
            return None
        except Exception as e:
            logger.error("cache_get_failed", key=key, error=str(e))
            return None
    
    def set(self, key: str, value: Any, ttl: int = None):
        """Set value in cache"""
        try:
            ttl = ttl or settings.CACHE_TTL
            self.redis_client.setex(
                key,
                ttl,
                json.dumps(value)
            )
        except Exception as e:
            logger.error("cache_set_failed", key=key, error=str(e))
    
    def delete(self, key: str):
        """Delete value from cache"""
        try:
            self.redis_client.delete(key)
        except Exception as e:
            logger.error("cache_delete_failed", key=key, error=str(e))
    
    def exists(self, key: str) -> bool:
        """Check if key exists"""
        try:
            return self.redis_client.exists(key) > 0
        except Exception as e:
            logger.error("cache_exists_failed", key=key, error=str(e))
            return False
    
    def flush_all(self):
        """Flush all cache (use with caution)"""
        try:
            self.redis_client.flushall()
            logger.warning("cache_flushed")
        except Exception as e:
            logger.error("cache_flush_failed", error=str(e))

# Global cache instance
cache_service = CacheService()